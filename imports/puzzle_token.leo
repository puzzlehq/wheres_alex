// The 'puzzle' program.
program puzzle_token.aleo {

    mapping supply: field => u64;

    record Puzz {
        private owner: address,
        private amount: u64,
    }

    record TokenOwnerRules {
        owner: address,
        m: u8,
        n: u8,
        signer_address_one: address,
        signer_address_two: address,
        signer_one_signature: signature,
        signer_two_signature: signature,
    }

    record PuzzStake {
        private owner: address,
        private amount: u64,
    }


    record TokenClaim {
        owner: address,
        amount: u64,
        claimable: bool,
        signer_address: address,
    }

    transition mint (private amount: u64, private to: address) -> Puzz {
        // todo: address check -> likely only permissioned address can mint puzz

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

    // transition stake_transfer_private_in (private puzz_token: Puzz, private to: address, private amount: u64) -> (PuzzClaim) {

    //     return PuzzClaim {
    //         owner: self.caller,
    //         amount: amount,
    //     };

    // }

    // owner_rules.claim have it return another owner rules bool or claim record that says no
    transition stake_transfer_private_out (private puzz_token: Puzz, private to: address, private amount: u64) -> (Puzz, Puzz) {

        // could have logic around signer_2_signature not present?

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