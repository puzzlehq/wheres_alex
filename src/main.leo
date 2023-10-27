import puzzle_token.leo;
import puzzle_account.leo;

// The 'coinflip' program.
program coinflip.aleo {

    // record PlayerOneClaim {}

    // record PlayerTwoClaim {}

    // record Claim {
    //     private owner: address,
    //     private amount: u64,
    // }

    record Key {
        private owner: address,
        private keys: field,
    }

    record Answer {
        private owner: address,
        private game_address: address,
        private N: field,
        private answer: field,
    }

    record RevealedAnswer {
        private owner: address,
        private answer: field,
    }

    // todo: this will likely need to store each player answer
    record Game {
        private owner: address,
        private answer_1: field,
        private answer_2: field,
        private wager: u64,
    }

    mapping puzz_supply: field => u128;
    mapping balances: address => u64;


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
    transition propose_game(
        private ms_seed: field,
        private game_address: address,
        private opponent: address,
        private wager: puzzle_token.leo/Puzz.record,
        private wager_amount: u64,
        private player_one_answer: field,
        private sig: signature,
        private m_of_n: u8,
        private nonce: field
    ) -> (Answer, puzzle_account.leo/Claim.record, Key, Game, puzzle_account.leo/OwnerRules.record, puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record)
    {
        // random edge case, maybe unnecessary
        assert_neq(game_address, opponent);
        let N: field = 1field;

        // assert that the wager amount > 0 and wager inside credit == wager amt passed
        let wager_record: Puzz = wager;
        assert(wager_amount > 0u64);
        assert_eq(wager_amount, wager_record.amount);

        // initialize key record with ms_address and seed for p2
        // so p2 can gen multisig locally
        let player_two_key_record: Key = Key {
            owner: opponent,
            keys: ms_seed,
        };

        // return answer record to player 1 in order to reveal later
        let answer_record: Answer = Answer {
            owner: self.caller,
            game_address: game_address,
            N: N,
            answer: player_one_answer,
        };

        // output game record
        // todo: hash this answer?
        let game_record: Game = Game {
            owner: game_address,
            answer_1: player_one_answer,
            answer_2: 1field,
            wager: wager_amount,
        };

        // output rules record with caller and opponent with game ms address
        // tbd on m of n here, or if even necessary
        let owner_rules: OwnerRules = puzzle_account.leo/mint_owner_rules_record(game_address, self.caller, opponent);

        // output claim record to game_addr if player 1 wants to renege or player 2 rejects
        // todo: will likely need to iterate on claim design here
        let player_one_claim_record: Claim = puzzle_account.leo/mint_claim_record(game_address, wager_amount);

        // transfer puzz tokens to game address
        // todo: may be able to mint tokens to alice and then transfer to ms in this fn. logic and not require puzz tokens as input
        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/transfer_private(wager, game_address, wager_amount);


        return (answer_record, player_one_claim_record, player_two_key_record, game_record, owner_rules, puzz_change, receiver_puzz_record);
    }



    transition player_one_renege_proposal (
        private game_record: Game,
        private ms_rules: puzzle_account.leo/OwnerRules.record,
        private player_one_claim_record: puzzle_account.leo/Claim.record,
        private puzz_record: puzzle_token.leo/Puzz.record,
        private amount: u64,
    ) -> ()
    {
        // todo: how are we going to transfer this out, likely need record as input to this function?
        // todo: checks on amount being transferred out and that player 1 is transferring out the correct record
        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/transfer_private(puzz_record, self.caller, amount);
        // todo: logic around ms_rules, game record tbd
    }

    // todo: how do we check bob is wagering the correct amount before wager submisison
    transition submit_wager (
        private game_address: address,
        private wager: puzzle_token.leo/Puzz.record,
        private wager_amount: u64
    ) -> (puzzle_account.leo/Claim.record, puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record) {

        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/transfer_private(wager, game_address, wager_amount);

        // output claim record to ms_addr in case player 2 wants to renege later on
        // todo: will likely need to iterate on claim design here
        let player_two_claim_record: Claim = puzzle_account.leo/mint_claim_record(game_address, wager_amount);

        return (player_two_claim_record, receiver_puzz_record, puzz_change);

    }

    transition player_two_renege_proposal (
        private game_record: Game,
        private ms_rules: puzzle_account.leo/OwnerRules.record,
        private player_two_claim_record: puzzle_account.leo/Claim.record,
        private token_record: puzzle_token.leo/Puzz.record,
        private amount: u64
    ) -> ()
    {
        // todo: how are we going to transfer this out, likely need record as input to this function?
        // todo: checks on amount being transferred out and that player 1 is transferring out the correct record
        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/transfer_private(token_record, self.caller, amount);
        // todo: logic around ms_rules, game record tbd
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
        // assert that each player has wagered the same amount
        assert_eq(player_one_claim_record.amount, player_two_claim_record.amount);

        // assert that the game_address matches on player claim records and game record
        assert_eq(player_one_claim_record.owner, player_two_claim_record.owner);
        assert_eq(game_record.owner, player_one_claim_record.owner);

        // add player 2's answer to the game record
        // todo: answers will need to be hashed?
        let game_record_new: Game = Game {
            owner: game_record.owner,
            answer_1: game_record.answer_1,
            answer_2: player_two_answer,
            wager: game_record.wager,
        };

        // note: will need to tweak owner rules structure likely to include sig to lock next turn
        let new_owner_rules: OwnerRules = puzzle_account.leo/mint_owner_rules_record(game_record.owner, self.caller, player_one_claim_record.signer_address);

        // todo: tweak for notify records
        // output owner rules record to ms so bob can claim later on
        return (game_record_new, new_owner_rules);
    }

    transition reveal_answer (
        private answer_record: Answer
    ) -> (RevealedAnswer)
    {
        let revealed_answer: RevealedAnswer = RevealedAnswer {
            owner: answer_record.owner,
            answer: answer_record.answer,
        };

        // todo: tweak for notify records
        return revealed_answer;
    }

    transition finish_game (
        private game_record: Game,
        private revealed_answer_record: RevealedAnswer
    ) -> ()
    {

        // todo: tweak for notify records
    }

    transition claim_wager () -> () {}




}