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
        signer_signature: signature,
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
    transition mint_token_owner_rules_record (
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
            signer_signature: signer_one_signature,
            signer_two_signature: signer_two_signature,
            is_claimable: false,
        };
        return token_new_rules;
    }


    // owner_rules.claim have it return another owner rules bool or claim record that says no
    transition puzz_transfer_private (
        private puzz_token: Puzz,
        private to: address,
        private amount: u64
    ) -> (Puzz, Puzz)
    {

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

    transition stake_transfer_private_in (
        private puzz_token: Puzz,
        private sender: address, // can't use self.caller as this is ref coinflip addr
        private to: address,
        private amount: u64
    ) -> (PuzzClaim, Puzz, Puzz)
    {

        // todo: do we need this? since we renege and transfer out with ms key
        let puzz_claim_record: PuzzClaim = PuzzClaim {
            owner: sender,
            amount: amount,
        };

        // new puzz record to receiver
        let receiver_new_record: Puzz = Puzz {
            owner: to,
            amount: amount
        };

        // puzz record with change for sender
        let sender_new_record: Puzz = Puzz {
            owner: sender,
            amount: puzz_token.amount - amount
        };

        // puzz_stake_record,
        return ( puzz_claim_record, receiver_new_record, sender_new_record);

    }

    // todo: change to take in amount
    transition stake_transfer_private_out (
        private puzz_token: Puzz,
        private token_owner_rules: TokenOwnerRules,
        private puzz_claim: PuzzClaim,
        private sig: signature,
        private msg: field,
        private amount_to_transfer: u64,
    ) -> (Puzz, Puzz)
    {

        // todo: logic to validate that the signature is either player 1 or player 2's signature in order to transfer out ?
        // todo: either player must have valid claim record and fn. logic will check valid signature, then allow withdraw of puzz tokens

        // validate if sig on puzz_claim is valid
        let is_verified: bool = sig.verify(puzz_claim.owner, msg);
        assert_eq(is_verified, true);

        // new puzz record to receiver
        let receiver_new_record: Puzz = Puzz {
            owner: puzz_claim.owner,
            amount: amount_to_transfer,
        };

        // puzz record with change for sender
        let sender_new_record: Puzz = Puzz {
            owner: puzz_claim.owner,
            amount: puzz_token.amount - amount_to_transfer
        };

        return (receiver_new_record, sender_new_record);
    }

}