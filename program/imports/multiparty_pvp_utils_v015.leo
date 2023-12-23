// The 'multiparty_pvp_utils_v015' program.
program multiparty_pvp_utils_v015.aleo {
    struct Mssage {
        field_1: field,
        field_2: field,
        field_3: field,
        field_4: field,
        field_5: field,
    }

    // ix: 1u32
    record Answer {
        owner: address, //challenger
        challenger_address: address,
        opponent_address: address,
        game_multisig: address,
        amount: u64,
        nonce: field,
        answer: field,
        message_1: field,
        message_2: field,
        message_3: field,
        message_4: field,
        message_5: field,
        ix: u32,
    }

    // ix: 2u32,
    record AuditMintAnswer {
        owner: address,
        answer_owner: address,
        challenger_address: address,
        opponent_address: address,
        game_multisig: address,
        amount: u64,
        nonce: field,
        answer: field,
        message_1: field,
        message_2: field,
        message_3: field,
        message_4: field,
        message_5: field,
        ix: u32,
    }

    // ix: 3u32
    record RevealAnswer {
        owner: address, //challenger
        challenger_address: address,
        opponent_address: address,
        game_multisig: address,
        amount: u64,
        nonce: field,
        answer: field,
        sig: signature,
        ix: u32,
    }

    // ix: 4u32
    record AuditRevealAnswer {
        owner: address, //challenger
        challenger_address: address,
        opponent_address: address,
        game_multisig: address,
        amount: u64,
        nonce: field,
        answer: field,
        sig: signature
        ix: u32,
    }

    // ix: 5u32
    record Key {
        owner: address, //opponent
        seed: field,
        amount: u64,
        challenger: address,
        opponent: address,
        game_multisig: address,
        ix: u32,
    }

    // ix: 6u32
    record AuditKey {
        owner: address, //puzzle issuer
        seed: field,
        amount: u64,
        challenger: address,
        opponent: address,
        game_multisig: address,
        ix: u32,
    }

    // Created by challenger at start of the game
    // Enforce that challenger address is the person who receives Answer Record
    // Verify challenger is the one calling this by fresh signature check (can do self.caller later)
    transition mint_answer (
        challenger_address: address,
        opponent_address: address,
        game_multisig: address,
        amount: u64,
        nonce: field,
        answer: field,
        message_1: field,
        message_2: field,
        message_3: field,
        message_4: field,
        message_5: field,
        sig: signature,
    ) -> (Answer, AuditMintAnswer) {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        let msg: Mssage = Mssage {
            field_1: message_1,
            field_2: message_2,
            field_3: message_3,
            field_4: message_4,
            field_5: message_5
        };

        // Verify signature against message to guarantee challenger is caller
        let signature_check: bool = true;
        let is_valid_sig: bool = sig.verify(challenger_address, msg);
        assert_eq(signature_check,is_valid_sig);

        let answer_record: Answer = Answer {
            owner: challenger_address,
            challenger_address: challenger_address,
            opponent_address: opponent_address,
            game_multisig: game_multisig,
            amount: amount,
            nonce: nonce,
            answer: answer,
            message_1: message_1,
            message_2: message_2,
            message_3: message_3,
            message_4: message_4,
            message_5: message_5,
            ix: 1u32,
        };

        let audit_record: AuditMintAnswer = AuditMintAnswer {
            owner: puzzle_issuer,
            answer_owner: challenger_address,
            challenger_address: challenger_address,
            opponent_address: opponent_address,
            game_multisig: game_multisig,
            amount: amount,
            nonce: nonce,
            answer: answer,
            message_1: message_1,
            message_2: message_2,
            message_3: message_3,
            message_4: message_4,
            message_5: message_5,
            ix: 2u32,
        };


        return (answer_record, audit_record);
    }

    transition mint_multisig_key(
        seed: field,
        amount: u64,
        challenger: address,
        opponent: address,
        game_multisig: address,
    ) -> (Key, AuditKey) {
        // TODO -- could add a check here turning seed into multisig
        // not doing because need to turn SK_SIG_DOMAIN in keygen into
        // fields. Can do easier after string support

        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        let key_record: Key = Key {
            owner: opponent,
            seed: seed,
            amount: amount,
            challenger: challenger,
            opponent: opponent,
            game_multisig: game_multisig,
            ix: 5u32,
        };

        let audit_key_record: AuditKey = AuditKey {
            owner: puzzle_issuer,
            seed: seed,
            amount: amount,
            challenger: challenger,
            opponent: opponent,
            game_multisig: game_multisig,
            ix: 6u32,
        };

        return (key_record, audit_key_record);
    }



    // Only callable by the challenger.
    // Enforced by checkinig that owner == challenger (and caller when fixed)
    // a signature from the ClaimSignature record from the token is used here
    transition reveal_answer (
        answer: Answer,
        sig: signature,
    ) -> (RevealAnswer, AuditRevealAnswer)
    {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        // Verify that owner is challenger
        assert_eq(answer.owner, answer.challenger_address);

        // Verify signature from Cagainst message to guarantee challenger is caller
        let msg: Mssage = Mssage {
            field_1: answer.message_1,
            field_2: answer.message_2,
            field_3: answer.message_3,
            field_4: answer.message_4,
            field_5: answer.message_5
        };

        let signature_check: bool = true;
        let is_valid_sig: bool = sig.verify(answer.challenger_address, msg);
        assert_eq(signature_check,is_valid_sig);


        let answer_owner: address = answer.owner;
        let answer_challenger_address: address = answer.challenger_address;
        let answer_opponent_address: address = answer.opponent_address;
        let game_multisig: address = answer.game_multisig;
        let answer_amount: u64 = answer.amount;
        let answer_nonce: field = answer.nonce;
        let answer_answer: field = answer.answer;

        let revealed_answer_record: RevealAnswer = RevealAnswer {
            owner: game_multisig,
            challenger_address: answer_challenger_address,
            opponent_address: answer_opponent_address,
            game_multisig: game_multisig,
            amount: answer_amount,
            nonce: answer_nonce,
            answer: answer_answer,
            sig: sig,
            ix: 3u32,
        };

        let audit_record: AuditRevealAnswer = AuditRevealAnswer {
            owner: puzzle_issuer,
            challenger_address: answer_challenger_address,
            opponent_address: answer_opponent_address,
            game_multisig: game_multisig,
            amount: answer_amount,
            nonce: answer_nonce,
            answer: answer_answer,
            sig: sig,
            ix: 4u32,
        };

        return (revealed_answer_record, audit_record);
    }
}
