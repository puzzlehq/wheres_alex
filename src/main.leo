import puzzle_token.leo;
import puzzle_account.leo;

// The 'coinflip' program.
program coinflip.aleo {

    // record PlayerOneClaim {}

    // record PlayerTwoClaim {}


    record Key {
        private owner: address,
        private keys: field,
    }

    record Answer {
        private owner: address,
        private N: field,
        private answer: u32,
    }

    mapping puzz_supply: field => u128;
    mapping balances: address => u64;

    transition mint_token (private amount: u64, private to: address) -> puzzle_token.leo/Puzz.record {
        let puzz_token: Puzz = puzzle_token.leo/mint(amount, to);
        return puzz_token;
    }

    // todo: do we want to limit only users or will we allow contracts to call?
    // todo: do we need to pass credits as input?
    transition propose_game(
        private ms_seed: field,
        private game_address: address,
        private opponent: address,
        private wager: puzzle_token.leo/Puzz.record,
        private wager_amount: u64,
        private answer: u32,
        private sig: signature,
        private m_of_n: u8,
        private nonce: field)
    -> (Answer, Key, puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record) {
        // assert wager microcredits > 0;
        let wager_record: Puzz = wager;
        assert_eq(wager_amount, wager_record.amount);
        assert(wager_amount > 0u64);

        // initialize key record with ms_address and seed for p2
        // so p2 can for multisig
        let player_two_key_record: Key = Key {
            owner: opponent,
            keys: ms_seed,
        };

        // declare answer_record with provided inputs
        let answer_record: Answer = Answer {
            owner: aleo1muq22xpnzgaeqez0mgkdcau6kcjpk6ztey0u8yv34zcupk3hpczsmxeaww,
            N: 1field,
            answer: answer,
        };

        // output claim record


        // output game record

        // output rules record with caller and opponent with game ms address
        // tbd on m of n here, or if even necessary
        let owner_rules: OwnerRules = puzzle_account.leo/mint_owner_rules_record(game_address, self.caller, opponent);

        // transfer aleo credits to game address
        // todo: may be able to mint tokens to alice and then transfer to ms in this fn. logic and not require puzz tokens as input
        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/transfer_private(wager, game_address, wager_amount);


        return (answer_record,  player_two_key_record, puzz_change, receiver_puzz_record);
    }

    transition player_one_reneg_proposal () -> () {}




    transition submit_wager (
        private puzz_token:  puzzle_token.leo/Puzz.record,
        private wager_amount: u64
    ) -> () {}

    transition player_two_reneg_proposal () -> () {}

    transition accept_game () -> () {}

    transition reveal_answer () -> () {}

    transition finish_game () -> () {}

    transition claim_wager () -> () {}




}
