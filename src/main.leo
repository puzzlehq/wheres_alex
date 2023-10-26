import puzzle_token.leo;
import puzzle_account.leo;

// The 'coinflip' program.
program coinflip.aleo {
    // struct {

    // }

    // struct {

    // }

    // record {

    // }

    // both of these will be passed from frontend
    // to reconstruct key record


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



    // transition propose_game(public a: Signature, private answer: u32, private opponent: address, wager: u32) -> u32 {
    //     let a: u32 = 1;
    //     let b: u32 = 1;
    //     return a + b;
    // }

    transition mint_token (private amount: u64, private to: address) -> puzzle_token.leo/Puzz.record {
        let puzz_token: Puzz = puzzle_token.leo/mint(amount, to);
        return puzz_token;
    }

    // todo: do we want to limit only users or will we allow contracts to call?
    transition propose_game(
        private ms_seed: field,
        private game_address: address,
        private opponent: address,
        private wager: puzzle_token.leo/Puzz.record,
        // add credits here
        private wager_amount: u64,
        private answer: u32,
        private sig: signature,
        private m_of_n: u8)
    -> (Answer, Key, puzzle_token.leo/Puzz.record, puzzle_token.leo/Puzz.record) {
        // assert wager microcredits > 0;
        let wager_record: Puzz = wager;
        assert_eq(wager_amount, wager_record.amount);
        assert(wager_amount > 0u64);

        // todo (ab): does proposer need key record since ms is already created
        // and proposer has necessary info already.
        let player_one_key_record: Key = Key {
            owner: self.caller,
            keys: ms_seed,
        };

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
        let (receiver_puzz_record, puzz_change): (Puzz, Puzz) = puzzle_token.leo/transfer_private(wager, game_address, wager_amount);

        // set the user amount on the contract

        return (answer_record, player_two_key_record, receiver_puzz_record, puzz_change);
    }

    // transition withdraw_wager(wagerer: address, wager_amount: u64) -> credits_new_world.leo/credits.record {

    // }


}
