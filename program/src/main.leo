import cflip_testing_123_token.leo;
import puzz_testing_acct_123.leo;

// todo: wait we're going to use alice's credits to send to multisig? need to add credits.leo but not supported yet per https://github.com/AleoHQ/leo/pull/2881
// imports deployed to separate address: https://t.me/c/1766615939/3581

// todo: the primary issue is that we need to consume owner rules inside of puzzle transfers but we can't do that?
// todo: actually does this matter, there is only 1 owner rules record floating?
// todo: can we consume it inside of this program?
// todo: since if we do not consume it inside the transfer then someone could rug?
// todo: also when transferring to winner will need to transfer both records
// todo: can we do this with inline functions?

// The 'coinflip' program.
program cflip_gm_aleo_testing_123.aleo {

    // record PlayerOneClaim {}

    // record PlayerTwoClaim {}

    // record Claim {
    //     private owner: address,
    //     private amount: u64,
    // }

    record NotifyKeyRecord {
        private owner: address,
        private keys: field,
        private game_address: address,
        private challenge_amount: u64,
        private opponent: address,
    }

    record NotifyRevealedAnswer {
        private owner: address,
        private answer: field,
        private game_address: address,
        private opponent: address,
    }

    record NotifyGameOver {
        private owner: address,
        private winner: address,
        private total_pot: u64,
        private game_address: address,
        private opponent: address,
    }

    record NotifyAcceptGame {
        private owner: address,
        private total_pot: u64,
        private game_address: address,
        private opponent: address,
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


    transition mint_token (private amount: u64, private to: address) -> cflip_testing_123_token.leo/Piece.record {
        let piece_token: Piece = cflip_testing_123_token.leo/mint(amount, to);
        return piece_token;
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
    // called by p1 key
    transition propose_game
    (
        private ms_seed: field,
        private game_address: address,
        private opponent: address,
        private wager: cflip_testing_123_token.leo/Piece.record,
        // private leo_credits: credits.leo/credits.record,
        // private credit_amount: u64,
        private wager_amount: u64,
        private player_one_answer: field,
        private sig: signature,
        private msg: field,
        private m_of_n: u8,
        private nonce: field,
    ) -> (Answer, NotifyKeyRecord, Game, puzz_testing_acct_123.leo/OwnerRules.record, cflip_testing_123_token.leo/PieceClaim.record, cflip_testing_123_token.leo/Piece.record, cflip_testing_123_token.leo/Piece.record)
    {
        // removing puzz_claim record for now

        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // random edge case, maybe unnecessary
        assert_neq(game_address, opponent);

        // assert that player 1s answer is either "in weeds" or "behind building"
        assert(player_one_answer == 0field || player_one_answer == 1field);
        // hash the answer and nonce
        let player_one_answer_comm: field = BHP256::commit_to_field(player_one_answer, nonce as scalar);

        // assert that the wager amount > 0 and wager inside credit == wager amt passed
        let wager_record: Piece = wager;
        assert(wager_amount > 0u64);
        // assert that the wager record has >= amount wagered
        assert(wager_record.amount >= wager_amount);

        // initialize key record with ms_address and seed for p2
        // so p2 can gen multisig locally
        // todo: we probably don't need address here?
        let notify_key_record: NotifyKeyRecord = NotifyKeyRecord {
            owner: opponent,
            keys: ms_seed,
            game_address: game_address,
            challenge_amount: wager_amount,
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
        let owner_rules_record: OwnerRules = puzz_testing_acct_123.leo/mint_owner_rules_record(game_address, self.caller, opponent, sig, sig);

        // stake puzz token in
        // todo: may be able to mint tokens to alice and then transfer to ms in this fn. logic and not require puzz tokens as input
        // let (puzz_claim_claim_record, puzz_receiver_record, puzz_sender_change_record): (PuzzClaim, Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_in(wager, self.caller, game_address, wager_amount);
        let (piece_claim_record, piece_receiver_record, piece_sender_change_record): (PieceClaim, Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_in(wager, self.caller, game_address, wager_amount, msg, sig);

        // todo: send credits to multisig
        // let creds_to_ms_record: (credits, credits) = credits.leo/transfer_private(leo_credits, game_address, credit_amount);

        // output claim record to game_addr if player 1 wants to renege or player 2 rejects
        // todo: will likely need to iterate on claim design here
        // let player_one_claim_record: Claim = puzz_testing_acct_123.leo/mint_claim_record(game_address, wager_amount);

        // transfer puzz tokens to game address
        // let (receiver_puzz_record, puzz_change): (Piece, Piece) = cflip_testing_123_token.leo/puzz_transfer_private(wager, game_address, wager_amount);


        // return (answer_record, player_two_key_record, game_record, owner_rules_record, token_owner_rules_record, puzz_claim_claim_record, puzz_receiver_record, puzz_sender_change_record) then finalize(game_address);
        return (answer_record, notify_key_record, game_record, owner_rules_record, piece_claim_record, piece_receiver_record, piece_sender_change_record) then finalize(game_address);
    }


    finalize propose_game (game_address: address) {
        Mapping::set(games, game_address, block.height);
    }

    // called by ms key
    transition player_one_renege_proposal
    (
        private game_record: Game,
        // private ms_rules: puzz_testing_acct_123.leo/OwnerRules.record,
        private token_owner_rules: cflip_testing_123_token.leo/TokenOwnerRules.record,
        private player_one_claim_record: cflip_testing_123_token.leo/PieceClaim.record,
        private piece_record: cflip_testing_123_token.leo/Piece.record,
        private amount: u64,
        // private sig: signature, // player 1 sig
        // private msg: field, // msg generated on propose_game with nonce
    ) -> (cflip_testing_123_token.leo/Piece.record, cflip_testing_123_token.leo/Piece.record)
    {
        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // transfer out and check player 1 sig and message that is signed
        // let (receiver_puzz_record, puzz_change): (Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_out(puzz_record, token_owner_rules, player_one_claim_record, sig, msg, amount);
        let (receiver_piece_record, piece_change): (Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_out(piece_record, player_one_claim_record, self.caller, amount);

        return (receiver_piece_record, piece_record);

        // todo: what clean-up do we need to do here?
    }

    // finalize player_one_renege_proposal (game_address: address) {
    //     let previous_block_height: u32 = Mapping::get(games, game_address);
    //     assert(block.height > previous_block_height);
    //     Mapping::set(games, game_address, block.height);
    // }

    // todo: how do we check bob is wagering the correct amount before wager submission
    // called by player 2 key
    transition submit_wager (
        private game_address: address,
        private opponent: address,
        private wager: cflip_testing_123_token.leo/Piece.record,
        private wager_amount: u64,
        // private nonce: field,
        private msg: field,
        private sig: signature,
    ) -> (cflip_testing_123_token.leo/PieceClaim.record, cflip_testing_123_token.leo/Piece.record, cflip_testing_123_token.leo/Piece.record) {

        // todo: removing claim record for now
        // todo: may be able to mint tokens to alice and then transfer to ms in this fn. logic and not require puzz tokens as input
        let (piece_claim_record, piece_receiver_record, piece_sender_change_record): (PieceClaim, Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_in(wager, self.caller, game_address, wager_amount, msg, sig);

        // let (receiver_puzz_record, puzz_change): (Piece, Piece) = cflip_testing_123_token.leo/puzz_transfer_private(wager, game_address, wager_amount);

        // let player_two_claim_record: Claim = puzz_testing_acct_123.leo/mint_claim_record(game_address, wager_amount);

        // return (token_owner_rules_record, puzz_claim_record, puzz_receiver_record, puzz_sender_change_record);
        return (piece_claim_record, piece_receiver_record, piece_sender_change_record);

    }

    // called by ms key
    transition player_two_renege_proposal (
        private game_record: Game,
        // private ms_rules: puzz_testing_acct_123.leo/OwnerRules.record,
        // private token_owner_rules: cflip_testing_123_token.leo/TokenOwnerRules.record,
        private player_two_claim_record: cflip_testing_123_token.leo/PieceClaim.record,
        private piece_record: cflip_testing_123_token.leo/Piece.record,
        private amount: u64,
        // private sig: signature, // player 1 sig
        // private msg: field, // msg generated on propose_game with nonce
    ) -> (cflip_testing_123_token.leo/Piece.record, cflip_testing_123_token.leo/Piece.record)
    {
        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // transfer out and check player 1 sig and message that is signed
        // let (receiver_puzz_record, puzz_change): (Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_out(puzz_record, token_owner_rules, player_two_claim_record, sig, msg, amount);
        let (receiver_piece_record, piece_change): (Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_out(piece_record, player_two_claim_record, self.caller, amount);

        return (receiver_piece_record, piece_change);
        // todo: what clean-up do we need to do here?
        // todo: update game state to finished/tbd if we need sep states between finished and cancelled/rejected
    }

    // called by ms key
    transition accept_game (
        private game_record: Game,
        // private player_one_claim_record: puzz_testing_acct_123.leo/Claim.record,
        // private player_two_claim_record: puzz_testing_acct_123.leo/Claim.record,
        // todo: do we need puzz record here/what for? since puzz record is already transferred to ms
        // private puzz_record: cflip_testing_123_token.leo/Piece.record,
        // private owner_rules_record: puzz_testing_acct_123.leo/OwnerRules.record,
        private player_two_answer: field,
        // private player_two_signature: signature,
        // todo: adjust msg type here
        // private leo_message: field,
    ) -> (Game, NotifyAcceptGame)
    {
        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // assert that each player has wagered the same amount
        // assert_eq(player_one_claim_record.amount, player_two_claim_record.amount);

        // assert that the game_address matches on player claim records and game record
        // assert_eq(player_one_claim_record.owner, player_two_claim_record.owner);
        // assert_eq(game_record.owner, player_one_claim_record.owner);

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

        // notify player 1 that the game has been accepted
        let notify_accept_game_record: NotifyAcceptGame = NotifyAcceptGame {
            owner: game_record.player_one_address,
            total_pot: game_record.total_pot,
            game_address: game_record.owner,
            opponent: game_record.player_one_address,
        };

        // note: will need to tweak owner rules structure likely to include sig to lock next turn
        // let new_owner_rules: OwnerRules =
        // puzz_testing_acct_123.leo/mint_owner_rules_record(game_record.owner, self.caller, player_one_claim_record.signer_address, player_two_signature, player_two_signature);

        // todo: tweak for notify records
        // output owner rules record to ms so bob can claim later on
        // return (game_record_new, new_owner_rules) then finalize(game_record.owner);
        return (game_record_new, notify_accept_game_record) then finalize(game_record.owner);
    }

    finalize accept_game (game_address: address) {
        let previous_block_height: u32 = Mapping::get(games, game_address);
        assert(block.height > previous_block_height);
        Mapping::set(games, game_address, block.height);
    }

    // called by p1 key
    transition reveal_answer (
        private answer_record: Answer,
        private game_address: address,
        private opponent_address: address,
    ) -> (RevealedAnswer, NotifyRevealedAnswer)
    {

        // limit calls to only users
        assert_eq(self.caller, self.signer);

        let revealed_answer: RevealedAnswer = RevealedAnswer {
            owner: game_address,
            answer: answer_record.answer,
            nonce: answer_record.nonce,
        };

        // send notify reveal record answer to player 2
        let notify_reveal_answer_p2: NotifyRevealedAnswer = NotifyRevealedAnswer {
            owner: opponent_address,
            answer: answer_record.answer,
            game_address: game_address,
            opponent: answer_record.owner,
        };

        return (revealed_answer, notify_reveal_answer_p2);
    }


    // called by ms key
    transition finish_game (
        private game_record: Game,
        private revealed_answer_record: RevealedAnswer,
        private piece_record: cflip_testing_123_token.leo/Piece.record,
        private player_claim_record: cflip_testing_123_token.leo/PieceClaim.record,
        // private puzz_stake_two: cflip_testing_123_token.leo/PuzzStake.record,
        // private token_owner_rules: cflip_testing_123_token.leo/TokenOwnerRules.record,
        // private sig: signature,
        // private msg: field,
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

        // player 1 loses, player 2 wins
        if (revealed_answer_record.answer == game_record.player_two_answer) {
            // transfer all funds to winner
            let (receiver_piece_record, piece_change): (Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_out(piece_record, player_claim_record, game_record.player_two_address, game_record.total_pot);
            // cflip_testing_123_token.leo/stake_transfer_private_out(puzz_record, token_owner_rules, player_claim_record, sig, msg, player_claim_record.amount * 2u64);

            // notify p1 and p2 the game is over
            let notify_game_over_p1_record: NotifyGameOver = NotifyGameOver {
                owner: game_record.player_one_address,
                winner: game_record.player_two_address,
                total_pot: game_record.total_pot,
                game_address: game_record.owner,
                opponent: game_record.player_two_address,
            };
            let notify_game_over_p2_record: NotifyGameOver = NotifyGameOver {
                owner: game_record.player_two_address,
                winner: game_record.player_two_address,
                total_pot: game_record.total_pot,
                game_address: game_record.owner,
                opponent: game_record.player_one_address,
            };
            // todo: return puzz records, some weird puzz undefined bug popping up
            return (notify_game_over_p1_record, notify_game_over_p2_record) then finalize(game_record.owner);
        }
        // player 1 wins, player 2 loses
        else {
            // transfer all funds to winner
            let (receiver_piece_record, piece_change): (Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_out(piece_record, player_claim_record, game_record.player_one_address, game_record.total_pot);
            // notify p1 and p2 the game is over
            let notify_game_over_p1_record: NotifyGameOver = NotifyGameOver {
                owner: game_record.player_one_address,
                winner: game_record.player_one_address,
                total_pot: game_record.total_pot,
                game_address: game_record.owner,
                opponent: game_record.player_two_address,
            };
            let notify_game_over_p2_record: NotifyGameOver = NotifyGameOver {
                owner: game_record.player_two_address,
                winner: game_record.player_one_address,
                total_pot: game_record.total_pot,
                game_address: game_record.owner,
                opponent: game_record.player_one_address,
            };
            // todo: return puzz records, some weird puzz undefined bug popping up
            return (notify_game_over_p1_record, notify_game_over_p2_record) then finalize(game_record.owner);
        }
    }

    finalize finish_game (game_address: address) {
        let previous_block_height: u32 = Mapping::get(games, game_address);
        assert(block.height > previous_block_height);
        Mapping::set(games, game_address, block.height);
    }

    // called by ms key
    transition claim_total_pot (
        private game_record: Game,
        private revealed_answer_record: RevealedAnswer,
        private piece_record: cflip_testing_123_token.leo/Piece.record,
        private player_claim_record: cflip_testing_123_token.leo/PieceClaim.record,
        // private puzz_stake_two: cflip_testing_123_token.leo/PuzzStake.record,
        // private token_owner_rules: cflip_testing_123_token.leo/TokenOwnerRules.record,
        // private sig: signature,
        // private msg: field,
    ) -> (cflip_testing_123_token.leo/Piece.record, cflip_testing_123_token.leo/Piece.record, NotifyGameOver, NotifyGameOver)
    {
        // todo: if alice never reveals answer than bob gets to claim total pot
        // limit calls to only users
        assert_eq(self.caller, self.signer);

        // need to assert that player 2 valid signature and valid message signed here, will validate inside stake transfer private logic
        // let (receiver_puzz_record, puzz_change): (Piece, Piece) =
            // cflip_testing_123_token.leo/stake_transfer_private_out(puzz_record, token_owner_rules, player_claim_record, sig, msg, player_claim_record.amount * 2u64);
        let (receiver_piece_record, piece_change): (Piece, Piece) = cflip_testing_123_token.leo/stake_transfer_private_out(piece_record, player_claim_record, self.caller, game_record.total_pot);

        let notify_game_over_p1_record: NotifyGameOver = NotifyGameOver {
                owner: game_record.player_one_address,
                winner: game_record.player_two_address,
                total_pot: game_record.total_pot,
                game_address: game_record.owner,
                opponent: game_record.player_two_address,
            };

        let notify_game_over_p2_record: NotifyGameOver = NotifyGameOver {
            owner: game_record.player_two_address,
            winner: game_record.player_two_address,
            total_pot: game_record.total_pot,
            game_address: game_record.owner,
            opponent: game_record.player_one_address,
        };

        return (receiver_piece_record, piece_change, notify_game_over_p1_record, notify_game_over_p2_record) then finalize(game_record.owner);
    }

    finalize claim_total_pot (game_address: address) -> () {
        // todo: change logic here to assert that a certain amount of time has passed to allow p2 to claim total pot
        let previous_block_height: u32 = Mapping::get(games, game_address);
        assert(block.height > previous_block_height + 1000u32);
        Mapping::set(games, game_address, block.height);
    }
}