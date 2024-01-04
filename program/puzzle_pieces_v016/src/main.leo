// The 'puzzle_pieces_v016' program.
// Without nested imports -- puzzle pieces is going to need Piece Keepers to enforce

program puzzle_pieces_v016.aleo {
    mapping supply: field => u64;

    struct Message {
        field_1: field,
        field_2: field,
        field_3: field,
        field_4: field,
        field_5: field,
    }

    // Never owned by multisig
    // ix: 0u32
    record Piece {
        owner: address,
        amount: u64,
        ix: u32,
    }

    // ix: 1u32
    record AuditMint {
        owner: address,
        minter: address,
        amount: u64,
        ix: u32,
    }

    // ix: 16u32
    record AuditJoin {
        owner: address,
        joiner: address,
        amount: u64,
        ix: u32,
    }

    // ix: 2u32
    record AuditTransfer {
        owner: address,
        sender: address,
        receiver: address,
        amount: u64,
        ix: u32,
    }

    // owned by multisig
    // ix: 3u32
    record PieceStake {
        owner: address,
        amount: u64,
        challenger: address,
        opponent: address,
        staker: address,
        ix: u32,
    }

    // ix: 4u32
    record AuditStakeIn {
        owner: address,
        staker: address,
        amount_in: u64,
        challenger: address,
        opponent: address,
        game_multisig: address,
        ix: u32,
    }

    // ix: 5u32
    record AuditStakeOut {
        owner: address,
        staker: address,
        amount_in: u64,
        challenger: address,
        opponent: address,
        game_multisig: address,
        ix: u32,
    }

    // owned by multisig
    // ix: 6u32
    record PieceClaim {
        owner: address,
        amount: u64,
        claimer: address,
        message_1: field,
        message_2: field,
        message_3: field,
        message_4: field,
        message_5: field,
        challenger: address,
        opponent: address,
        ix: u32,
    }

    // owned by individual
    // ix: 7u32
    record ClaimSignature {
        owner: address,
        sig: signature,
        amount: u64,
        game_multisig: address,
        challenger: address,
        opponent: address,
        ix: u32
    }

    // owned by multsig
    // ix: 8u32
    record JointPieceTimeClaim {
        owner: address,
        amount: u64,
        time_claimer_address: address,
        state_updater_address: address,
        message_1: field,
        message_2: field,
        message_3: field,
        message_4: field,
        message_5: field,
        game_multisig: address,
        challenger: address,
        opponent: address,
        block_ht: u32,
        ix: u32,
    }

    // owned by multisig
    // ix: 9u32
    record PieceJointStake {
        owner: address,
        amount: u64,
        time_claimer_address: address,
        state_updater_address: address,
        block_ht: u32,
        ix: u32,
    }
    //For block height — user can set it but can’t pull it onchain to check until a finalize
    // So a multisig Alice may want to penalize Bob and take bob’s stake if he inputs the wrong on
    // - We should track who updates this multisig state to who sets block height to be able to penalize
    // something like adding input (address, sig) where address is individual key with signature set to something
    // and set JointPieceCreator: address (challenger or opponent) ---> question about what is field vulnerabilities for msg

    // owned by challenger only
    // ix: 10u32
    record JointPieceState {
        owner: address,
        amount: u64,
        time_claimer_address: address,
        state_updater_address: address,
        message_1: field,
        message_2: field,
        message_3: field,
        message_4: field,
        message_5: field,
        challenger: address,
        opponent: address,
        game_multisig: address,
        ix: u32
    }

    // ix: 11u32
    record AuditJointStake {
        owner: address,
        amount: u64,
        time_claimer_address: address,
        state_updater_address: address,
        block_ht: u32,
        challenger: address,
        opponent: address,
        game_multisig: address,
        ix: u32,
    }

    // owned by multisig
    // ix: 12u32
    record JointPieceWinner {
        owner: address,
        amount: u64,
        time_claimer_address: address,
        state_updater_address: address,
        challenger: address,
        opponent: address,
        game_multisig: address,
        winner: address,
        ix: u32,
    }

    // ix: 13u32
    record AuditJointPieceWinner {
        owner: address,
        amount: u64,
        time_claimer_address: address,
        state_updater_address: address,
        challenger: address,
        opponent: address,
        game_multisig: address,
        winner: address,
        ix: u32,
    }

    // ix: 14u32
    record AuditTransferToWinner {
        owner: address,
        challenger: address,
        opponent: address,
        game_multisig: address,
        receiver: address,
        amount: u64,
        ix: u32,
    }

    // ix: 15u32
    // output on transfer_joint_stake_to_winner -- use auditTransferToWinner to solve tracking games & winners -- use this data pipe for easier tracking notes
    record AuditPieceOwner {
        owner: address,
        piece_holder: address,
        amount: u64,
        ix: u32,
    }


    transition mint_private (amount: u64, to: address) -> (Piece, AuditMint) {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        // no checks on minting right now. test actions and audit without address check

        // puzzle pieces minted
        let minted_puzzle_pieces: Piece = Piece {
            owner: to,
            amount: amount,
            ix: 0u32,
        };

        // audit record for issuer to know supply
        let audit_record: AuditMint = AuditMint {
            owner: puzzle_issuer,
            minter: to,
            amount: amount,
            ix: 1u32,
        };

        return (minted_puzzle_pieces, audit_record);
    }

    // join 2 pieces
    transition join_pieces
    (
        piece_record_one: Piece,
        piece_record_two: Piece,
    ) ->
    (
        Piece,
        AuditJoin,
    )
    {
        // assert contracts can't call this
        assert_eq(self.caller, self.signer);

        // assert that function caller owns both piece records
        assert(piece_record_one.owner == self.signer);
        assert(piece_record_two.owner == self.signer);

        // assert that the piece records have values > 0
        assert(piece_record_one.amount > 0u64);
        assert(piece_record_two.amount > 0u64);

        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        let joined_piece_record: Piece = Piece {
            owner: self.signer,
            amount: piece_record_one.amount + piece_record_two.amount,
            ix: 0u32,
        };

        // audit record for issuer to know supply
        let audit_join_record: AuditJoin = AuditJoin {
            owner: puzzle_issuer,
            joiner: self.signer,
            amount: piece_record_one.amount + piece_record_two.amount,
            ix: 32u32,
        };

        return (joined_piece_record, audit_join_record);
    }

    transition transfer_private (sender: Piece, receiver: address, amount: u64) -> (Piece, Piece, AuditTransfer) {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        let difference: u64 = sender.amount - amount;

        let remaining: Piece = Piece {
            owner: sender.owner,
            amount: difference,
            ix: 0u32,
        };

        let transferred: Piece = Piece {
            owner: receiver,
            amount: amount,
            ix: 0u32,
        };

        // audit record for issuer to know holders
        let audit_record: AuditTransfer = AuditTransfer {
            owner: puzzle_issuer,
            sender: sender.owner,
            receiver: receiver,
            amount: amount,
            ix: 2u32,
        };

        return (remaining, transferred, audit_record);

    }

    // transferring pieces into multisig for a 1v1 game between a challenger and an opponent
    // challenger and opponent both transfer pieces to the multisig and multisig gets two staked pieces
    // opponent can convert two staked puzzles pieces into a joint-stake
    // once challenger reveals answer, joint-stake is converted to full amount of pieces & sent to winner
    //
    // Exit states exist such that
    // challenger or opponent can retrieve their respective stake before locked in joint-stake
    // if challenger never reveals answer, after time T then joint-stake is awarded to opponent (ie an auto win)
    //
    // Winner gets all the puzzle pieces.
    // called by each individual key
    transition stake_transfer_in (
        piece_token: Piece,
        sender: address, // can't use self.caller or self.signer until leo fixed
        challenger: address,
        opponent: address,
        game_multisig: address,
        amount: u64,
        message_1: field,
        message_2: field,
        message_3: field,
        message_4: field,
        message_5: field,
        sig: signature
    ) -> (PieceClaim, PieceStake, ClaimSignature, Piece, AuditStakeIn)
    {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        // ownership checks on sender == self.caller cant be done until Leo is updated
        // can't use self.caller or self.signer until leo fixed
        assert_eq(piece_token.owner, sender);

        // check that sender is either challenger or opponent
        if sender == challenger {
            assert_eq(sender, challenger);
        } else {
            assert_eq(sender, opponent);
        }
        // check that challenger & opponent are different addresses
        assert_neq( challenger , opponent);

        let piece_claim_record: PieceClaim = PieceClaim {
            owner: game_multisig,
            amount: amount,
            claimer: sender,
            message_1: message_1,
            message_2: message_2,
            message_3: message_3,
            message_4: message_4,
            message_5: message_5,
            challenger: challenger,
            opponent: opponent,
            ix: 6u32,
        };

        // claim signature to depositor -- signature against message and used to redeem
        let sender_claim_sig_record: ClaimSignature = ClaimSignature {
            owner: sender,
            sig: sig,
            amount: amount,
            game_multisig: game_multisig,
            challenger: challenger,
            opponent: opponent,
            ix: 7u32,
        };

        // new puzz record to receiver
        let receiver_new_record: PieceStake = PieceStake {
            owner: game_multisig,
            amount: amount,
            challenger: challenger,
            opponent: opponent,
            staker: sender,
            ix: 3u32,
        };

        // puzz record with change for sender
        let sender_change_record: Piece = Piece {
            owner: sender,
            amount: piece_token.amount - amount,
            ix: 0u32,
        };

        // record to asset issuer to keep tabs on activity
        let audit_record: AuditStakeIn = AuditStakeIn {
            owner: puzzle_issuer,
            staker: piece_token.owner,
            amount_in: amount,
            challenger: challenger,
            opponent: opponent,
            game_multisig: game_multisig,
            ix: 4u32,
        };

        return (piece_claim_record, receiver_new_record, sender_claim_sig_record, sender_change_record, audit_record);

    }

    // Unstaking PieceStake from Multisig to Staker
    // Staker key signs message on Claim Record then
    // calls this function with Multisig key and signature as input
    //
    // stake amount returned is equal to amount in claim and returned to staking key
    transition stake_transfer_out (
        piece_stake: PieceStake,
        piece_claim: PieceClaim,
        sig: signature
    ) -> (Piece, AuditStakeOut) {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        // 1. Check Claim & Stake are from same game_multisig
        assert_eq(piece_stake.owner, piece_claim.owner);

        // 2. Check Claim & Stake have the same game details
        assert_eq(piece_stake.challenger,piece_claim.challenger);
        assert_eq(piece_stake.opponent,piece_claim.opponent);
        assert_eq(piece_stake.amount,piece_claim.amount);

        // 3. Check Claimer has verified this with a fresh signature against the message
        let msg: Message = Message {
            field_1: piece_claim.message_1,
            field_2: piece_claim.message_2,
            field_3: piece_claim.message_3,
            field_4: piece_claim.message_4,
            field_5: piece_claim.message_5
        };



        let signature_check: bool = true;
        let is_valid_sig: bool = sig.verify(piece_claim.claimer, msg);
        assert_eq(signature_check,is_valid_sig);

        let piece_oot: Piece = Piece {
            owner: piece_claim.claimer,
            amount: piece_claim.amount,
            ix: 0u32,
        };

        let audit_record: AuditStakeOut = AuditStakeOut {
            owner: puzzle_issuer,
            staker: piece_claim.claimer,
            amount_in: piece_claim.amount,
            challenger: piece_claim.challenger,
            opponent: piece_claim.opponent,
            game_multisig: piece_claim.owner,
            ix: 5u32
        };

        return (piece_oot, audit_record);
    }

    // Jointly staking both pieces to the Multisig
    // calls this function with the Multisig key
    // JointStake note amount is the combination of the two
    transition transfer_stakes_to_joint(
        piece_stake_challenger: PieceStake,
        piece_claim_challenger: PieceClaim,
        piece_stake_opponent: PieceStake,
        piece_claim_opponent: PieceClaim,
        block_ht: u32 //good actor uses our api endpoint on FE to get blockheight and use as inputs
    ) -> (PieceJointStake, JointPieceTimeClaim, JointPieceState, AuditJointStake) {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        // 0. Add a self.signer check against
        let owner: address = piece_stake_challenger.owner;
        // assert_eq(owner, self.signer);

        // 1. Check that all are from the same multisig
        assert_eq(piece_claim_challenger.owner,owner);
        assert_eq(piece_stake_opponent.owner,owner);
        assert_eq(piece_claim_opponent.owner,owner);

        // 2. Check that the game state is the same for all
        let amount: u64 = piece_stake_challenger.amount;
        assert_eq(piece_claim_challenger.amount,amount);
        assert_eq(piece_stake_opponent.amount,amount);
        assert_eq(piece_claim_opponent.amount,amount);

        let challenger: address = piece_stake_challenger.challenger;
        assert_eq(piece_claim_challenger.challenger,challenger);
        assert_eq(piece_stake_opponent.challenger,challenger);
        assert_eq(piece_claim_opponent.challenger,challenger);

        let opponent: address = piece_stake_challenger.opponent;
        assert_eq(piece_claim_challenger.opponent,opponent);
        assert_eq(piece_stake_opponent.opponent,opponent);
        assert_eq(piece_claim_opponent.opponent,opponent);

        // 3. Check that claimer addresses match stake address
        assert_eq(piece_claim_challenger.claimer, piece_stake_challenger.challenger);
        assert_eq(piece_claim_opponent.claimer, piece_stake_opponent.opponent);

        // Create JointStake and send to multisig key
        let piece_joint_stake: PieceJointStake = PieceJointStake {
            owner: owner,
            amount: amount + amount,
            time_claimer_address: opponent,
            state_updater_address: challenger,
            block_ht: block_ht,
            ix: 9u32
        };

        // Create JointPieceState such that challenger can update state and send to
        let joint_piece_state: JointPieceState = JointPieceState {
            owner: challenger,
            amount: amount + amount,
            time_claimer_address: opponent,
            state_updater_address: challenger,
            message_1: piece_claim_challenger.message_1,
            message_2: piece_claim_challenger.message_2,
            message_3: piece_claim_challenger.message_3,
            message_4: piece_claim_challenger.message_4,
            message_5: piece_claim_challenger.message_5,
            challenger: challenger,
            opponent: opponent,
            game_multisig: owner,
            ix: 10u32,
        };

        // Create JointPieceTimeClaim -- note current block production is ~ 1 block/5 sec --> 12 blocks/min
        let joint_piece_time_claim: JointPieceTimeClaim = JointPieceTimeClaim {
            owner: owner,
            amount: amount + amount,
            time_claimer_address: opponent,
            state_updater_address: challenger,
            message_1: piece_claim_opponent.message_1,
            message_2: piece_claim_opponent.message_2,
            message_3: piece_claim_opponent.message_3,
            message_4: piece_claim_opponent.message_4,
            message_5: piece_claim_opponent.message_5,
            game_multisig: owner,
            challenger: challenger,
            opponent: opponent,
            block_ht: block_ht,
            ix: 8u32,
        };

        // send to issuer for analytics
        let audit_record: AuditJointStake = AuditJointStake {
            owner: opponent,
            amount: amount + amount,
            time_claimer_address: opponent,
            state_updater_address: challenger,
            block_ht: block_ht,
            challenger: challenger,
            opponent: opponent,
            game_multisig: owner,
            ix: 11u32,
        };

        return (piece_joint_stake, joint_piece_time_claim, joint_piece_state, audit_record );
    }

    // Challenger calls this function with the challenger key
    // revealing answer and creating record with winner on it
    // Sends winner record to multisig to use to finish game
    //
    // This call is nested inside Reveal Answer in where's alex game
    //
    // Burns their claim signature record here
    transition joint_stake_state_update(
        joint_piece_state: JointPieceState,
        sig: ClaimSignature,
        winner: address
    ) -> (JointPieceWinner, AuditJointPieceWinner) {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        // 0. Check that owner matches
        assert_eq(joint_piece_state.owner, sig.owner);

        // 1. Check that owner is the one allowed to udpate state
        assert_eq(joint_piece_state.state_updater_address,sig.owner);
        assert_eq(joint_piece_state.state_updater_address,sig.challenger);

        // 2. Check the rest of the details of the game
        assert_eq(joint_piece_state.amount, sig.amount + sig.amount );
        assert_eq(joint_piece_state.opponent,sig.opponent);
        assert_eq(joint_piece_state.game_multisig,joint_piece_state.game_multisig);

        // 3. Check Claimer has verified this with a signature against the message from beginning
        let msg: Message = Message {
            field_1: joint_piece_state.message_1,
            field_2: joint_piece_state.message_2,
            field_3: joint_piece_state.message_3,
            field_4: joint_piece_state.message_4,
            field_5: joint_piece_state.message_5
        };

        let sign: signature = sig.sig;
        let signature_check: bool = true;
        let is_valid_sig: bool = sign.verify(joint_piece_state.state_updater_address, msg);
        assert_eq(signature_check,is_valid_sig);

        // The logic for the answer and computing winner is in wheres_alex program
        // The enforcement to prevent the challenger calling this function without going through
        // where's alex is via the Piece Keepers
        //
        // Logic is if a piece keeper sees that there is an address that is different from the answer record for the game,
        // then can submit to public mapping then person can not spend pieces again. Also lets you mint their amount
        // You also get a receipt to mint more pieces that you see their address has -- maybe?
        //
        // Just a simple check here to verify it's an opponent or challenger
        // check that sender is either challenger or opponent
        if winner == joint_piece_state.challenger {
            assert_eq(winner,joint_piece_state.challenger);
        } else {
            assert_eq(winner,joint_piece_state.opponent);
        }

        let joint_piece_winner: JointPieceWinner = JointPieceWinner {
            owner: joint_piece_state.game_multisig,
            amount: joint_piece_state.amount,
            time_claimer_address: joint_piece_state.time_claimer_address,
            state_updater_address: joint_piece_state.state_updater_address,
            challenger: joint_piece_state.challenger,
            opponent: joint_piece_state.opponent,
            game_multisig: joint_piece_state.game_multisig,
            winner: winner,
            ix: 12u32,
        };

        // for the piece keepers
        let audit_record: AuditJointPieceWinner = AuditJointPieceWinner {
            owner: joint_piece_state.game_multisig,
            amount: joint_piece_state.amount,
            time_claimer_address: joint_piece_state.time_claimer_address,
            state_updater_address: joint_piece_state.state_updater_address,
            challenger: joint_piece_state.challenger,
            opponent: joint_piece_state.opponent,
            game_multisig: joint_piece_state.game_multisig,
            winner: winner,
            ix: 13u32,
        };

        return (joint_piece_winner, audit_record);
    }

    // Called with multisig key
    // Any multisig member calls this function to end the game and transfer the pieces
    transition joint_stake_transfer_to_winner(
        joint_piece_winner: JointPieceWinner,
        piece_joint_stake: PieceJointStake,
        joint_piece_time_claim: JointPieceTimeClaim,
    ) -> (Piece,AuditTransferToWinner, AuditPieceOwner) {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        // 0. Add a self.signer check against
        let game_multisig: address = joint_piece_winner.owner;
        // assert_eq(owner, self.signer);

        // 1. Check that all are from the same multisig
        assert_eq(piece_joint_stake.owner,game_multisig);
        assert_eq(joint_piece_time_claim.owner,game_multisig);

        // 2. Check that the game state is the same for all
        let amount: u64 = joint_piece_winner.amount;
        assert_eq(piece_joint_stake.amount,amount);
        assert_eq(joint_piece_time_claim.amount,amount);

        let challenger: address = joint_piece_winner.challenger;
        assert_eq(piece_joint_stake.state_updater_address,challenger);
        assert_eq(joint_piece_time_claim.challenger,challenger);

        let opponent: address = joint_piece_winner.opponent;
        assert_eq(piece_joint_stake.time_claimer_address,opponent);
        assert_eq(joint_piece_time_claim.opponent,opponent);

        // Check that winner is challenger or opponent
        let winner: address = joint_piece_winner.winner;
        if winner == piece_joint_stake.time_claimer_address {
            assert_eq(winner,piece_joint_stake.time_claimer_address);
        } else {
            assert_eq(winner,piece_joint_stake.state_updater_address);
        }

        let piece_to_winner: Piece = Piece {
            owner: winner,
            amount: amount,
            ix: 0u32,
        };

        let audit_record: AuditTransferToWinner = AuditTransferToWinner {
            owner: puzzle_issuer,
            challenger: challenger,
            opponent: opponent,
            game_multisig: game_multisig,
            receiver: winner,
            amount: amount,
            ix: 14u32
        };

        let audit_piece_owner: AuditPieceOwner = AuditPieceOwner {
            owner: puzzle_issuer,
            piece_holder: winner,
            amount: amount,
            ix: 15u32
        };

        return (piece_to_winner, audit_record, audit_piece_owner);
    }

    // The challenger has not updated joint piece state for a winner in time of blockheight
    // This is an auto-win for the opponent
    // The opponent then calls the below finish to win and convert stake to pieces via multisig key
    //
    // Assume signature used in this is done signature from ClaimSignature
    // we are going to be stranded with the ClaimSignature owned by the user's key
    //
    // If this is called -- we are going to be stranded with a ClaimSignature & JointPieceState on the above
    //
    // This function is called with the multisig key
    //
    //
    transition joint_timeout_to_opponent (
        piece_joint_stake: PieceJointStake,
        joint_piece_time_claim: JointPieceTimeClaim,
        sig: signature, // use from ClaimSignature record on FE, can't consume in this fxn bc claim is owned by multisig
    ) -> (Piece, AuditTransferToWinner)
    {
        // set puzzle issuing address as issuer:
        let puzzle_issuer: address = aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls;

        // 1. Check that all are from the same multisig
        let game_multisig: address = joint_piece_time_claim.owner;
        assert_eq(piece_joint_stake.owner, game_multisig);

        // 2. Check that the game state is the same for all
        let amount: u64 = joint_piece_time_claim.amount;
        assert_eq(piece_joint_stake.amount, amount);

        // 2. Check that the game state is the same for all
        let challenger: address = joint_piece_time_claim.challenger;
        assert_eq(piece_joint_stake.state_updater_address, challenger);

        let opponent: address = joint_piece_time_claim.opponent;
        assert_eq(piece_joint_stake.time_claimer_address, opponent);

        // 3. Check Claimer has verified this with a signature against the message from beginning
        // FE -- use the claim signature record for opponent address here to fill in
        let msg: Message = Message {
            field_1: joint_piece_time_claim.message_1,
            field_2: joint_piece_time_claim.message_2,
            field_3: joint_piece_time_claim.message_3,
            field_4: joint_piece_time_claim.message_4,
            field_5: joint_piece_time_claim.message_5
        };

        let signature_check: bool = true;
        let is_valid_sig: bool = sig.verify(joint_piece_time_claim.time_claimer_address, msg);
        assert_eq(signature_check,is_valid_sig);


        let piece_to_winner: Piece = Piece {
            owner: opponent,
            amount: amount,
            ix: 0u32,
        };

        let audit_record: AuditTransferToWinner = AuditTransferToWinner {
            owner: puzzle_issuer,
            challenger: challenger,
            opponent: opponent,
            game_multisig: game_multisig,
            receiver: opponent,
            amount: amount,
            ix: 14u32
        };

        return (piece_to_winner, audit_record);
    }
}