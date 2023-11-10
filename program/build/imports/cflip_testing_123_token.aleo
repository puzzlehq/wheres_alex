program cflip_testing_123_token.aleo;

record Piece:
    owner as address.private;
    amount as u64.private;

record TokenOwnerRules:
    owner as address.private;
    m as u8.private;
    n as u8.private;
    signer_address_one as address.private;
    signer_address_two as address.private;
    signer_signature as signature.private;
    signer_two_signature as signature.private;

record PieceStake:
    owner as address.private;
    amount as u64.private;
    staker_address_one as address.private;
    staker_address_two as address.private;

record PieceClaim:
    owner as address.private;
    amount as u64.private;
    claimer as address.private;

record TokenClaim:
    owner as address.private;
    amount as u64.private;
    claimable as boolean.private;
    signer_address as address.private;

record PieceTimeClaim:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;

record PieceJointStake:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;
    state_updater_address as address.private;

record PieceState:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;
    state_updater_address as address.private;
    answer as field.private;


mapping supply:
	key as field.public;
	value as u64.public;

function mint:
    input r0 as u64.private;
    input r1 as address.private;
    cast r1 r0 into r2 as Piece.record;
    output r2 as Piece.record;


function mint_token_owner_rules_record:
    input r0 as address.private;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as signature.private;
    input r4 as signature.private;
    cast r0 2u8 2u8 r1 r2 r3 r4 into r5 as TokenOwnerRules.record;
    output r5 as TokenOwnerRules.record;


function stake_transfer_private_in:
    input r0 as Piece.record;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as u64.private;
    input r4 as field.private;
    input r5 as signature.private;
    cast r2 r3 r1 into r6 as PieceClaim.record;
    cast r2 r3 into r7 as Piece.record;
    sub r0.amount r3 into r8;
    cast r1 r8 into r9 as Piece.record;
    output r6 as PieceClaim.record;
    output r7 as Piece.record;
    output r9 as Piece.record;


function stake_transfer_in_alt:
    input r0 as Piece.record;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as u64.private;
    input r4 as field.private;
    input r5 as signature.private;
    input r6 as address.private;
    cast r2 r3 r1 into r7 as PieceClaim.record;
    cast r2 r3 r1 r6 into r8 as PieceStake.record;
    cast r2 r3 into r9 as Piece.record;
    sub r0.amount r3 into r10;
    cast r1 r10 into r11 as Piece.record;
    output r7 as PieceClaim.record;
    output r8 as PieceStake.record;
    output r9 as Piece.record;
    output r11 as Piece.record;


function retrieve_stake_in:
    input r0 as Piece.record;
    input r1 as PieceStake.record;
    input r2 as PieceClaim.record;
    input r3 as address.private;
    input r4 as address.private;
    input r5 as signature.private;
    cast r4 r2.amount into r6 as Piece.record;
    sub r0.amount r2.amount into r7;
    cast r3 r7 into r8 as Piece.record;
    output r6 as Piece.record;
    output r8 as Piece.record;


function transfer_stake_to_joint:
    input r0 as Piece.record;
    input r1 as PieceStake.record;
    input r2 as PieceClaim.record;
    input r3 as PieceStake.record;
    input r4 as PieceClaim.record;
    input r5 as address.private;
    input r6 as address.private;
    input r7 as signature.private;
    add r1.amount r3.amount into r8;
    cast r1.owner r8 r1.staker_address_two r1.staker_address_one into r9 as PieceJointStake.record;
    add r1.amount r3.amount into r10;
    cast r1.owner r10 r1.staker_address_two into r11 as PieceTimeClaim.record;
    add r1.amount r3.amount into r12;
    cast r1.owner r12 r1.staker_address_two r1.staker_address_one 12321field into r13 as PieceState.record;
    output r9 as PieceJointStake.record;
    output r11 as PieceTimeClaim.record;
    output r13 as PieceState.record;


function transfer_joint_stake_timeout:
    input r0 as Piece.record;
    input r1 as PieceTimeClaim.record;
    input r2 as PieceJointStake.record;
    input r3 as PieceState.record;
    input r4 as signature.private;
    cast r2.time_claimer_address r2.amount into r5 as Piece.record;
    sub r0.amount r2.amount into r6;
    cast r0.owner r6 into r7 as Piece.record;
    output r5 as Piece.record;
    output r7 as Piece.record;


function joint_state_stake_update:
    input r0 as PieceState.record;
    input r1 as address.private;
    input r2 as signature.private;
    input r3 as field.private;
    input r4 as address.private;
    cast r0.owner r0.amount r0.time_claimer_address r0.state_updater_address r3 into r5 as PieceState.record;
    output r5 as PieceState.record;


function joint_stake_transfer_out:
    input r0 as Piece.record;
    input r1 as PieceJointStake.record;
    input r2 as PieceTimeClaim.record;
    input r3 as PieceState.record;
    input r4 as signature.private;
    input r5 as address.private;
    cast r5 r1.amount into r6 as Piece.record;
    sub r0.amount r1.amount into r7;
    cast r5 r7 into r8 as Piece.record;
    output r6 as Piece.record;
    output r8 as Piece.record;


function stake_transfer_private_out:
    input r0 as Piece.record;
    input r1 as PieceClaim.record;
    input r2 as address.private;
    input r3 as u64.private;
    gte r1.amount r3 into r4;
    assert.eq r4 true;
    assert.eq r1.claimer r2;
    assert.eq r0.owner r1.owner;
    cast r2 r3 into r5 as Piece.record;
    sub r0.amount r3 into r6;
    cast r0.owner r6 into r7 as Piece.record;
    output r5 as Piece.record;
    output r7 as Piece.record;
