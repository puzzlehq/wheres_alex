import puzzle_token.leo;
import puzzle_account.leo;

// The 'coinflip' program.
program coinflip.aleo {

    // record PlayerOneClaim {}

    // record PlayerTwoClaim {}

    record Claim {
        private owner: address,
        private amount: u64,
    }

    record Key {
        private owner: address,
        private keys: field,
    }

    record Answer {
        private owner: address,
        private N: field,
        private answer: u32,
    }

    record Game {
        private owner: address,
        private answer_1: field,
        private answer_2: field,
    }

    mapping puzz_supply: field => u128;
    mapping balances: address => u64;


    transition mint_token (private amount: u64, private to: address) -> puzzle_token.leo/Puzz.record {
        let puzz_token: Puzz = puzzle_token.leo/mint(amount, to);
        return puzz_token;
    }

    // todo: do we want to limit only users or will we allow contracts to call?
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
        private answer: u32,
        private sig: signature,
        private m_of_n: u8,
        private nonce: field
    ) -> (Answer, Claim, Key, Game, puzzle_account.leo/OwnerRules.record, puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record)
    {
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
            N: N,
            answer: answer,
        };

        // output game record
        let game_record: Game = Game {
            owner: game_address,
            answer_1: 0field,
            answer_2: 1field,
        };

        // output rules record with caller and opponent with game ms address
        // tbd on m of n here, or if even necessary
        let owner_rules: OwnerRules = puzzle_account.leo/mint_owner_rules_record(game_address, self.caller, opponent);

        // output claim record to player 1 in case of renege or player 2 rejects
        // todo: will likely need to iterate on claim design here
        let player_one_claim_record: Claim = Claim {
            owner: self.caller,
            amount: wager_amount,
        };

        // transfer puzz tokens to game address
        // todo: may be able to mint tokens to alice and then transfer to ms in this fn. logic and not require puzz tokens as input
        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/transfer_private(wager, game_address, wager_amount);


        return (answer_record, player_one_claim_record, player_two_key_record, game_record, owner_rules, puzz_change, receiver_puzz_record);
    }


    //
    transition player_one_renege_proposal (
        private game: Game,
        private ms_rules: puzzle_account.leo/OwnerRules.record,
        private claim: puzzle_token.leo/ClaimRecord.record,
        private token_record: puzzle_token.leo/Puzz.record,
        private amount: u64,
    ) -> ()
    {
        // todo: how are we going to transfer this out, likely need record as input to this function?
        // todo: checks on amount being transferred out and that player 1 is transferring out the correct record
        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/transfer_private(token_record, self.caller, amount);
        // todo: logic around ms_rules, game record tbd
    }

    transition submit_wager (
        private game_address: address,
        private wager:  puzzle_token.leo/Puzz.record,
        private wager_amount: u64
    ) -> (Claim, puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record) {

        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/transfer_private(wager, game_address, wager_amount);

        // output claim record to player 2 in case he wants to renege later on
        // todo: will likely need to iterate on claim design here
        let player_two_claim_record: Claim = Claim {
            owner: self.caller,
            amount: wager_amount,
        };

        return (player_two_claim_record, receiver_puzz_record, puzz_change);

    }

    transition player_two_renege_proposal (
        private game: Game,
        private ms_rules: puzzle_account.leo/OwnerRules.record,
        private claim: puzzle_token.leo/ClaimRecord.record,
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
        

    ) -> ()
    {

    }

    transition reveal_answer () -> () {}

    transition finish_game () -> () {}

    transition claim_wager () -> () {}




}
