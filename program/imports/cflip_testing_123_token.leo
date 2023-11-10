// The 'puzzle' program.
program cflip_testing_123_token.aleo {

    mapping supply: field => u64;

    record Piece {
        private owner: address,
        private amount: u64,
    }

    record PieceClaim {
        private owner: address,
        private amount: u64,
        private claimer: address,
        private msg: field,
        private sig: signature,
        private is_claimable: bool,
    }

    record JointPieceClaim {
        private owner: address,
        private amount: u64,
        private time_claimer_address: address,
        private is_claimable: bool,
    }

    record TokenOwnerRules {
        owner: address,
        m: u8,
        n: u8,
        signer_address_one: address,
        signer_address_two: address,
        signer_signature: signature,
        signer_two_signature: signature,
    }

    record PieceStake {
        private owner: address,
        private amount: u64,
    }

    record TokenClaim {
        owner: address,
        amount: u64,
        claimable: bool,
        signer_address: address,
    }

    transition mint (private amount: u64, private to: address) -> Piece {
        // todo: address check -> likely only permissioned address can mint Piece

        return Piece {
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
        // todo: permissioned function that can only be executed by the main leo address?
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
        };
        return token_new_rules;
    }

    transition stake_transfer_private_in (
        // private token_owner_rules: TokenOwnerRules,
        private piece_token: Piece,
        private sender: address, // can't use self.caller as this is ref coinflip program addr
        private to: address,
        private amount: u64,
        private msg: field,
        private sig: signature,
    ) -> (PieceClaim, Piece, Piece)
    {

        let piece_claim_record: PieceClaim = PieceClaim {
            owner: to,
            amount: amount,
            claimer: sender,
            msg: msg,
            sig: sig,
            is_claimable: true,
        };

        // new puzz record to receiver
        let receiver_new_record: Piece = Piece {
            owner: to,
            amount: amount
        };

        // puzz record with change for sender
        let sender_new_record: Piece = Piece {
            owner: sender,
            amount: piece_token.amount - amount
        };

        // puzz_stake_record,
        // return ( puzz_claim_record, receiver_new_record, sender_new_record);
        return (piece_claim_record, receiver_new_record, sender_new_record);

    }


    transition stake_transfer_renege
    (
        private piece_token: Piece,
        private piece_claim: PieceClaim,
        private sender: address,
        private to: address,
        private amount: u64,
    ) -> (Piece, Piece)
    {
        // assert that piece is claimable
        let claimable: bool = true;
        assert_eq(piece_claim.is_claimable, claimable);

        // todo: verify the caller is also on the claim token via msg/signature


        // new puzz record to receiver
        let receiver_new_record: Piece = Piece {
            owner: to,
            amount: amount
        };

        // puzz record with change for sender
        let sender_new_record: Piece = Piece {
            owner: sender,
            amount: piece_token.amount - amount
        };

        return (receiver_new_record, sender_new_record);

    }

    transition update_game_state_to_final (
        private game_record: Game,
    ) -> (Game)
    {
        let new_game_state: Game = Game {
            owner: game_record.owner,
            player_one_comm: game_record.player_one_comm,
            player_two_answer: game_record.player_two_answer,
            total_pot: game_record.total_pot,
            player_one_address: game_record.player_one_address,
            player_two_address: game_record.player_two_address,
            game_state: 2field,
        };

        return new_game_state;
    }

    // note: looks like there's a function length limit?
    transition consume_claim_mint_joint
    (
        private piece_claim_one: PieceClaim,
        private piece_claim_two: PieceClaim,
        private game_address: address,
        private player_two_address: address,
    ) -> (PieceClaim, PieceClaim, JointPieceClaim)
    {

        let piece_claim_one_spent: PieceClaim = PieceClaim {
            owner: piece_claim_one.owner,
            amount: piece_claim_one.amount,
            claimer: piece_claim_one.claimer,
            msg: piece_claim_one.msg,
            sig: piece_claim_one.sig,
            is_claimable: false,
        };

        let piece_claim_two_spent: PieceClaim = PieceClaim {
            owner: piece_claim_two.owner,
            amount: piece_claim_two.amount,
            claimer: piece_claim_two.claimer,
            msg: piece_claim_two.msg,
            sig: piece_claim_two.sig,
            is_claimable: false,
        };

        let joint_piece_claim: JointPieceClaim = JointPieceClaim {
            owner: game_address,
            amount: piece_claim_one.amount + piece_claim_two.amount,
            time_claimer_address: player_two_address,
            is_claimable: false,
        };

        return (piece_claim_one_spent, piece_claim_two_spent, joint_piece_claim);
    }


    transition transfer_winner
    (
        private piece_token: Piece,
        private joint_piece_claim: JointPieceClaim,
        private winner: address,
        private game: Game,
    ) -> (Piece, Piece, JointPieceClaim)
    {
        // let claimable: bool = true;
        // assert_eq(joint_piece_claim.is_claimable, true);

        // assert finish_game or claim_total_pot has been called
        assert_eq(game.game_state, 2field);

        // new puzz record to receiver
        let receiver_new_record: Piece = Piece {
            owner: winner,
            amount: joint_piece_claim.amount,
        };

        // puzz record with change for sender
        let sender_new_record: Piece = Piece {
            owner: winner,
            amount: piece_token.amount - joint_piece_claim.amount,
        };

        // spend joint_piece_claim_record
        let spent_joint_piece_claim: JointPieceClaim = JointPieceClaim {
            owner: winner,
            amount: joint_piece_claim.amount,
            time_claimer_address: joint_piece_claim.time_claimer_address,
            is_claimable: false,
        };

        return (receiver_new_record, sender_new_record, spent_joint_piece_claim);

    }

    // todo: change to take in amount
    transition stake_transfer_private_out (
        private piece_token: Piece,
        // private token_owner_rules: TokenOwnerRules,
        private piece_claim: PieceClaim,
        private to: address,
        // private sig: signature,
        // private msg: field,
        private amount_to_transfer: u64,
    ) -> (Piece, Piece)
    {

        // todo: logic to validate that the signature is either player 1 or player 2's signature in order to transfer out ?
        // todo: either player must have valid claim record and fn. logic will check valid signature, then allow withdraw of puzz tokens

        // todo: claim record needs to be owned by ms
        // todo: address check on claim?

        // validate if sig on puzz_claim is valid
        // todo: add in additional logic to verify signatures...
        let is_verified: bool = piece_claim.sig.verify(piece_claim.claimer, piece_claim.msg);
        assert_eq(is_verified, true);

        // assert that the claim is >= transfer amount
        assert(piece_claim.amount >= amount_to_transfer);

        // assert that claimer is the one receiving the funds
        assert_eq(piece_claim.claimer, to);

        // make sure that the piece token being claimed is the correct game_address of the token
        // todo: potential attack vector where loser can still stake_transfer_private out?
        assert_eq(piece_token.owner, piece_claim.owner);

        // new puzz record to receiver
        let receiver_new_record: Piece = Piece {
            owner: to,
            amount: amount_to_transfer,
        };

        // puzz record with change for sender
        let sender_new_record: Piece = Piece {
            owner: piece_token.owner,
            amount: piece_token.amount - amount_to_transfer
        };

        return (receiver_new_record, sender_new_record);
    }

}