// The 'puzzle' program.
program puzzle_token.aleo {

    mapping supply: field => u64;

    record Puzz {
        private owner: address,
        private amount: u64,
    }

    record PuzzClaim {
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
        is_claimable: bool,
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

    // Create new owner rules record
    transition mint_token_owner_rules_record
    (
        owner_address: address,
        signer_address_one: address,
        signer_address_two: address,
        signer_one_signature: signature,
        signer_two_signature: signature
    ) -> TokenOwnerRules
    {
        // note: just adding signer_address_two here for additional signer
        // add claim bool
        // owner rules.claim (claim record) -> sets bool to true
        // is it true or does it have 2 signatures
        let token_new_rules: TokenOwnerRules = TokenOwnerRules {
            owner: owner_address,
            m: 2u8,
            n: 2u8,
            signer_address_one: signer_address_one,
            signer_address_two: signer_address_two,
            signer_one_signature: signer_one_signature,
            signer_two_signature: signer_two_signature,
            is_claimable: false,
        };
        return token_new_rules;
    }


    // owner_rules.claim have it return another owner rules bool or claim record that says no
    transition puzz_transfer_private (private puzz_token: Puzz, private to: address, private amount: u64) -> (Puzz, Puzz) {

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

    transition stake_transfer_private_in (private puzz_token: Puzz, private to: address, private amount: u64) -> (PuzzStake, PuzzClaim) {

        let puzz_stake_record: PuzzStake = PuzzStake {
            owner: self.caller,
            amount: amount,
        };

        let puzz_claim_record: PuzzClaim = PuzzClaim {
            owner: self.caller,
            amount: amount,
        };

        return (puzz_stake_record, puzz_claim_record);

    }

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