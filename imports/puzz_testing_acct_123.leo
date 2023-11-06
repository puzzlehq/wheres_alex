program puzz_testing_acct_123.aleo {

    // what do we want this program to do?
    // let's consider simple case: 1 of 1

    // todo: for signers > 1:
    // need to generate new addr on the fly
    // store multiple Signatures

    record Claim {
        owner: address,
        amount: u64,
        claimable: bool,
        signer_address: address,
    }

    record PuzzAcctStake {
        private owner: address,
        private amount: u64,
    }

    // todo: tweak owner rules here to have signatures for lock on transfers of puzz token and lock game state
    // maybe some next_turn: address mechanism so only certain player can mess with next game state
    record OwnerRules {
        owner: address,
        m: u8,
        n: u8,
        signer_address_one: address,
        signer_address_two: address,
        is_claimable: bool,
        signer_one_signature: signature,
        signer_two_signature: signature,
    }

    record OwnerRulesClaim {
        owner: address,
        m: u8,
        n: u8,
        signer_address_one: address,
        signer_address_two: address,
        is_claimable: bool,
    }

    record Signatures {
        owner: address,
        message_one: field,
        message_two: field,
        message_three: field,
        message_four: field,
        signed_message: signature,
        signer_address: address,
    }

    transition mint_claim_record (owner_address: address, claim_amount: u64) -> Claim {
        let is_claimable: bool = true;
        let claim: Claim = Claim {
            owner: owner_address,
            amount: claim_amount,
            claimable: is_claimable,
            signer_address: self.caller,
        };
        return claim;
    }

    // Create new owner rules record
    transition mint_owner_rules_record
    (
        owner_address: address,
        signer_address_one: address,
        signer_address_two: address,
        signer_one_signature: signature,
        signer_two_signature: signature
    ) -> OwnerRules
    {
        // note: just adding signer_address_two here for additional signer
        // add claim bool
        // owner rules.claim (claim record) -> sets bool to true
        // is it true or does it have 2 signatures
        let new_rules: OwnerRules = OwnerRules {
            owner: owner_address,
            m: 2u8,
            n: 2u8,
            signer_address_one: signer_address_one,
            signer_address_two: signer_address_two,
            signer_one_signature: signer_one_signature,
            signer_two_signature: signer_two_signature,
            is_claimable: false,
        };
        return new_rules;
    }

    // Consume owner rules record (used when importing to other programs)
    transition consume_owner_rules_record(owner_rules: OwnerRules) -> (u8, u8, address, address) {
        let m: u8 = owner_rules.m;
        let n: u8 = owner_rules.n;
        let signer_address_one: address = owner_rules.signer_address_one;
        let signer_address_two: address = owner_rules.signer_address_two;
        return (m, n, signer_address_one, signer_address_two);
    }

    // Create new signatures record
    // Signatures generated using WASM fxns for leo_message_gen and leo_signature
    transition mint_signatures_record(message_one: field, message_two: field, message_three: field, message_four: field, signed_message: signature, signer_address: address) -> Signatures {
        let new_signatures: Signatures = Signatures {
            owner: self.caller,
            message_one: message_one,
            message_two: message_two,
            message_three: message_three,
            message_four: message_four,
            signed_message: signed_message,
            signer_address: signer_address,
        };
        return new_signatures;
    }

    // Consume signatures record (used when importing to other programs)
    transition consume_signatures_record(sigs: Signatures) -> (field, field, field, field, signature, address) {
        let message_one: field = sigs.message_one;
        let message_two: field = sigs.message_two;
        let message_three: field = sigs.message_three;
        let message_four: field = sigs.message_four;
        let signed_message: signature = sigs.signed_message;
        let signer_address: address = sigs.signer_address;
        return (message_one, message_two, message_three, message_four, signed_message, signer_address);
    }
}