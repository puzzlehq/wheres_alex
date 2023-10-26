// The 'puzzle' program.
program puzzle_token.aleo {

    mapping supply: field => u64;

    record Puzz {
        private owner: address,
        private amount: u64,
    }

    transition mint (private amount: u64, private to: address) -> Puzz {
        // todo: address check -> likely only permissioned address cna mint puzz

        return Puzz {
            owner: to,
            amount: amount,
        };
    }


    // owner_rules.claim have it return another owner rules bool or claim record that says no
    transition transfer_private (private puzz_token: Puzz, private to: address, private amount: u64) -> (Puzz, Puzz) {

        // new puzz record to receiver
        let receiver_new_record: Puzz = Puzz {
            owner: to,
            amount: amount
        };

        // puzz record with change for sender
        let sender_new_record: Puzz = Puzz {
            owner: self.caller,
            amount: puzz_token.amount - amount
        };

        return (receiver_new_record, sender_new_record);
    }

    //     } then finalize (amount);
    // }

    // finalize mint (minted_amount: u128) {
    //     let current_supply: u128 = Mapping::get(supply, 123field);
    //     Mapping::set(supply, 123field, current_supply + minted_amount);
    // }


}