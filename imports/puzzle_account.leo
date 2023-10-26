program puzzle_account.aleo {

    // what do we want this program to do?
    // let's consider simple case: 1 of 1

    // todo: for signers > 1:
    // need to generate new addr on the fly
    // store multiple Signatures

    record OwnerRules {
        owner: address,
        m: u8,
        n: u8,
        signer_address_one: address,
        signer_address_two: address,
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

    // Create new owner rules record
    transition mint_owner_rules_record(owner_address: address, signer_address_one: address, signer_address_two: address) -> OwnerRules {
        // note: just adding signer_address_two here for additional signer
        // add claim bool
        // owner rules.claim (claim record) -> sets bool to true
        // is it true or does it have 2 signatures
        let new_rules: OwnerRules = OwnerRules {
            owner: owner_address,
            m: 1u8,
            n: 1u8,
            signer_address_one: signer_address_one,
            signer_address_two: signer_address_two,
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