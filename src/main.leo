import puzzle_token.leo;
import puzzle_account.leo;

// todo: wait we're going to use alice's credits to send to multisig? need to add credits.leo but not supported yet per https://github.com/AleoHQ/leo/pull/2881
// todo: ownerrules lock on game state? next turn: address on game_record work?
// todo: are imports deployed separately to separate addresses? yes looks like it -> https://t.me/c/1766615939/3581
// todo: how do we transfer puzz into game at the beginning? don't have bobs address and is_claimable false

// The 'coinflip' program.
program coinflip.aleo {

    // record PlayerOneClaim {}

    // record PlayerTwoClaim {}

    // record Claim {
    //     private owner: address,
    //     private amount: u64,
    // }

    record NotifyRevealedAnswer {
        private owner: address,
        private answer: field,
    }

    record NotifyGameOver {
        private owner: address,
        private winner: address,
        private total_pot: u64,
    }

    record Key {
        private owner: address,
        private keys: field,
        private opponent: address,
    }

    record Answer {
        private owner: address,
        private game_address: address,
        private nonce: field,
        private answer: field,
    }

    record RevealedAnswer {
        private owner: address,
        private answer: field,
        private nonce: field,
    }

    // todo: this will likely need to store each player answer
    // todo: may be best to store players in the game here on game record
    // todo: add block height to game record?
    record Game {
        private owner: address,
        private player_one_comm: field,
        private player_two_answer: field,
        private total_pot: u64,
        private player_one_address: address,
        private player_two_address: address,
        private game_state: field,
        // private game_state: field,
        // 0 -> propose game
        // 1 -> accept game
        // 2 -> game finished
    }

    mapping puzz_supply: field => u128;
    mapping games: address => u32;


    transition mint_token (private amount: u64, private to: address) -> puzzle_token.leo/Puzz.record {
        let puzz_token: Puzz = puzzle_token.leo/mint(amount, to);
        return puzz_token;
    }

    // todo: do we want to limit this fn call only to users or will we allow contracts to call?
    // todo: do we need to pass credits as input?
    // player one proposes game
    // outputs
    // -> Answer record to player 1, to later reveal answer
    // -> Claim record to player 1, to claim record if decides to pull back proposal before game is accepted
    // -> Key record to player 2 to be able to reconstruct the game/multisig address
    // -> OwnerRules record to the game/multisig address
    // -> Game record to the game/multisig address
    // -> PuzzRecord to the game/multisig address
    // -> PuzzRecord to player 1 of any change from the wager credit

    // todo: tweak messages here
    transition propose_game
    (
        private ms_seed: field,
        private game_address: address,
        private opponent: address,
        private wager: puzzle_token.leo/Puzz.record,
        // private leo_credits: credits.leo/credits.record,
        // private credit_amount: u64,
        private wager_amount: u64,
        private player_one_answer: field,
        private sig: signature,
        private msg: field,
        private m_of_n: u8,
        private nonce: field,
    ) -> (Answer, Key, Game, puzzle_account.leo/OwnerRules.record, puzzle_token.leo/TokenOwnerRules.record,
          puzzle_token.leo/PuzzClaim.record, puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record)
    {

        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // random edge case, maybe unnecessary
        assert_neq(game_address, opponent);

        // assert that player 1s answer is either "in weeds" or "behind building"
        assert(player_one_answer == 0field || player_one_answer == 1field);
        // hash the answer and nonce
        let player_one_answer_comm: field = BHP256::commit_to_field(player_one_answer, nonce as scalar);

        // assert that the wager amount > 0 and wager inside credit == wager amt passed
        let wager_record: Puzz = wager;
        assert(wager_amount > 0u64);
        assert_eq(wager_amount, wager_record.amount);

        // initialize key record with ms_address and seed for p2
        // so p2 can gen multisig locally
        let player_two_key_record: Key = Key {
            owner: opponent,
            keys: ms_seed,
            opponent: self.caller,
        };

        // return answer record to player 1 in order to reveal later
        let answer_record: Answer = Answer {
            owner: self.caller,
            game_address: game_address,
            nonce: nonce,
            answer: player_one_answer,
        };

        // output game record
        let game_record: Game = Game {
            owner: game_address,
            player_one_comm: player_one_answer_comm,
            player_two_answer: 1field,
            total_pot: wager_amount,
            player_one_address: self.caller,
            player_two_address: opponent,
            game_state: 0field,
        };

        // output rules record with caller and opponent with game ms address
        // tbd on m of n here, or if even necessary
        // todo: send player 1 sig here and message to verify we can transfer on propose_game?
        let owner_rules_record: OwnerRules = puzzle_account.leo/mint_owner_rules_record(game_address, self.caller, opponent, sig, sig);

        // mint token owner rules with player 1 sig against nonce, will need to store message and sig on FE
        let token_owner_rules_record: TokenOwnerRules = puzzle_token.leo/mint_token_owner_rules_record(game_address, self.caller, opponent, sig, sig);

        // stake puzz token in
        // todo: may be able to mint tokens to alice and then transfer to ms in this fn. logic and not require puzz tokens as input
        let (puzz_claim_claim_record, puzz_receiver_record, puzz_sender_change_record): (PuzzClaim, Puzz, Puzz) = puzzle_token.leo/stake_transfer_private_in(wager, game_address, wager_amount);

        // todo: send credits to multisig
        // let creds_to_ms_record: (credits, credits) = credits.leo/transfer_private(leo_credits, game_address, credit_amount);

        // output claim record to game_addr if player 1 wants to renege or player 2 rejects
        // todo: will likely need to iterate on claim design here
        // let player_one_claim_record: Claim = puzzle_account.leo/mint_claim_record(game_address, wager_amount);

        // transfer puzz tokens to game address
        // let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/puzz_transfer_private(wager, game_address, wager_amount);


        return (answer_record, player_two_key_record, game_record, owner_rules_record, token_owner_rules_record, puzz_claim_claim_record, puzz_receiver_record, puzz_sender_change_record) then finalize(game_address);
    }


    finalize propose_game (game_address: address) {
        Mapping::set(games, game_address, block.height);
    }


    transition player_one_renege_proposal
    (
        private game_record: Game,
        private ms_rules: puzzle_account.leo/OwnerRules.record,
        private token_owner_rules: puzzle_token.leo/TokenOwnerRules.record,
        private player_one_claim_record: puzzle_token.leo/PuzzClaim.record,
        private puzz_record: puzzle_token.leo/Puzz.record,
        private amount: u64,
        private sig: signature, // player 1 sig
        private msg: field, // msg generated on propose_game with nonce
    ) -> (puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record)
    {
        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // transfer out and check player 1 sig and message that is signed
        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/stake_transfer_private_out(puzz_record, token_owner_rules, player_one_claim_record, sig, msg);

        return (receiver_puzz_record, puzz_record);

        // todo: what clean-up do we need to do here?
    }

    // finalize player_one_renege_proposal (game_address: address) {
    //     let previous_block_height: u32 = Mapping::get(games, game_address);
    //     assert(block.height > previous_block_height);
    //     Mapping::set(games, game_address, block.height);
    // }

    // todo: how do we check bob is wagering the correct amount before wager submisison
    transition submit_wager (
        private game_address: address,
        private opponent: address,
        private wager: puzzle_token.leo/Puzz.record,
        private wager_amount: u64,
        private nonce: field,
        private msg: field,
        private sig: signature,
    ) -> (puzzle_token.leo/TokenOwnerRules.record, puzzle_token.leo/PuzzClaim.record, puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record) {

        // todo: may be able to mint tokens to alice and then transfer to ms in this fn. logic and not require puzz tokens as input
        let (puzz_claim_claim_record, puzz_receiver_record, puzz_sender_change_record): (PuzzClaim, Puzz, Puzz) = puzzle_token.leo/stake_transfer_private_in(wager, game_address, wager_amount);

        // mint token owner rules with player 2 sig against nonce, will need to store message and sig on FE
        let token_owner_rules_record: TokenOwnerRules = puzzle_token.leo/mint_token_owner_rules_record(game_address, self.caller, opponent, sig, sig);

        // let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/puzz_transfer_private(wager, game_address, wager_amount);

        // let player_two_claim_record: Claim = puzzle_account.leo/mint_claim_record(game_address, wager_amount);

        return (token_owner_rules_record, puzz_claim_claim_record, puzz_receiver_record, puzz_sender_change_record);

    }

    transition player_two_renege_proposal (
        private game_record: Game,
        private ms_rules: puzzle_account.leo/OwnerRules.record,
        private token_owner_rules: puzzle_token.leo/TokenOwnerRules.record,
        private player_two_claim_record: puzzle_token.leo/PuzzClaim.record,
        private puzz_record: puzzle_token.leo/Puzz.record,
        private amount: u64,
        private sig: signature, // player 1 sig
        private msg: field, // msg generated on propose_game with nonce
    ) -> (puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record)
    {
        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // transfer out and check player 1 sig and message that is signed
        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/stake_transfer_private_out(puzz_record, token_owner_rules, player_two_claim_record, sig, msg);

        return (receiver_puzz_record, puzz_change);

        // todo: what clean-up do we need to do here?
        // todo: update game state to finished/tbd if we need sep states between finished and cancelled/rejected
    }

    transition accept_game (
        private game_record: Game,
        private player_one_claim_record: puzzle_account.leo/Claim.record,
        private player_two_claim_record: puzzle_account.leo/Claim.record,
        // todo: do we need puzz record here/what for? since puzz record is already transferred to ms
        private puzz_record: puzzle_token.leo/Puzz.record,
        private owner_rules_record: puzzle_account.leo/OwnerRules.record,
        private player_two_answer: field,
        private player_two_signature: signature,
        // todo: adjust msg type here
        private leo_message: field,
    ) -> (Game, puzzle_account.leo/OwnerRules.record)
    {
        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // assert that each player has wagered the same amount
        assert_eq(player_one_claim_record.amount, player_two_claim_record.amount);

        // assert that the game_address matches on player claim records and game record
        assert_eq(player_one_claim_record.owner, player_two_claim_record.owner);
        assert_eq(game_record.owner, player_one_claim_record.owner);

        // assert that the game is in the propose_state status
        assert_eq(game_record.game_state, 0field);

        // assert that player 1s answer is either "in weeds" or "behind building"
        assert(player_two_answer == 0field || player_two_answer == 1field);

        // add player 2's answer to the game record
        // todo: answers will need to be hashed?
        let game_record_new: Game = Game {
            owner: game_record.owner,
            player_one_comm: game_record.player_one_comm,
            player_two_answer: player_two_answer,
            total_pot: game_record.total_pot,
            player_one_address: game_record.player_one_address,
            player_two_address: game_record.player_two_address,
            game_state: 1field, // update to game accepted
        };

        // note: will need to tweak owner rules structure likely to include sig to lock next turn
        let new_owner_rules: OwnerRules = puzzle_account.leo/mint_owner_rules_record(game_record.owner, self.caller, player_one_claim_record.signer_address, player_two_signature, player_two_signature);

        // todo: tweak for notify records
        // output owner rules record to ms so bob can claim later on
        return (game_record_new, new_owner_rules) then finalize(game_record.owner);
    }

    finalize accept_game (game_address: address) {
        let previous_block_height: u32 = Mapping::get(games, game_address);
        assert(block.height > previous_block_height);
        Mapping::set(games, game_address, block.height);
    }

    transition reveal_answer (
        private answer_record: Answer,
        private game_address: address,
        private opponent_address: address,
    ) -> (RevealedAnswer, NotifyRevealedAnswer, NotifyRevealedAnswer)
    {

        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // todo: what is the best way to get p2's address here?
        let revealed_answer: RevealedAnswer = RevealedAnswer {
            owner: game_address,
            answer: answer_record.answer,
            nonce: answer_record.nonce,
        };

        // send notify reveal record answer to player 1
        let notify_reveal_answer_p1: NotifyRevealedAnswer = NotifyRevealedAnswer {
            owner: answer_record.owner,
            answer: answer_record.answer,
        };

        // send notify reveal record answer to player 2
        let notify_reveal_answer_p2: NotifyRevealedAnswer = NotifyRevealedAnswer {
            owner: opponent_address,
            answer: answer_record.answer,
        };

        // todo: tweak for notify records
        return (revealed_answer, notify_reveal_answer_p1, notify_reveal_answer_p2);
    }

    transition finish_game (
        private game_record: Game,
        private revealed_answer_record: RevealedAnswer,
        private puzz_record: puzzle_token.leo/Puzz.record,
    ) -> (NotifyGameOver, NotifyGameOver)
    {
        // todo: how do we transfer out from ms/game addr to winner
        // todo: do we just mint new tokens to winner?
        // todo: add logic here to transfer to correct winner
        // todo: how are we going to get player 1 and player 2 addresses here?
        // todo: adjust revealing logic now that we are hashing p1's answer

        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // assert that the game has been accepted
        assert_eq(game_record.game_state, 1field);

        // player 1 wins, player 2 loses
        if (revealed_answer_record.answer != game_record.player_two_answer) {
            // transfer all funds to winner
            puzzle_token.leo/puzz_transfer_private(puzz_record, revealed_answer_record.owner, game_record.total_pot);
            // notify p1 and p2 the game is over
            let notify_game_over_p1_record: NotifyGameOver = NotifyGameOver {
                owner: self.caller,
                winner: self.caller,
                total_pot: game_record.total_pot
            };
            let notify_game_over_p2_record: NotifyGameOver = NotifyGameOver {
                owner: game_record.player_two_address,
                winner: self.caller,
                total_pot: game_record.total_pot
            };
            return (notify_game_over_p1_record, notify_game_over_p2_record) then finalize(game_record.owner);
        }
        // player 1 loses, player 2 wins
        else {
            // transfer all funds to winner
            puzzle_token.leo/puzz_transfer_private(puzz_record, self.caller, game_record.total_pot);
            // notify p1 and p2 the game is over
            let notify_game_over_p1_record: NotifyGameOver = NotifyGameOver {
                owner: self.caller,
                winner: game_record.player_two_address,
                total_pot: game_record.total_pot
            };
            let notify_game_over_p2_record: NotifyGameOver = NotifyGameOver {
                owner: game_record.player_two_address,
                winner: game_record.player_two_address,
                total_pot: game_record.total_pot
            };
            return (notify_game_over_p1_record, notify_game_over_p2_record) then finalize(game_record.owner);
        }
    }

    finalize finish_game (game_address: address) {
        let previous_block_height: u32 = Mapping::get(games, game_address);
        assert(block.height > previous_block_height);
        Mapping::set(games, game_address, block.height);
    }

    transition claim_wager () -> () {
        // limit calls to only users
        assert_eq(self.caller, self.signer);
    }



}