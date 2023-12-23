program puzzle_pieces_v016.aleo;

struct Message:
    field_1 as field;
    field_2 as field;
    field_3 as field;
    field_4 as field;
    field_5 as field;

record Piece:
    owner as address.private;
    amount as u64.private;
    ix as u32.private;

record AuditMint:
    owner as address.private;
    minter as address.private;
    amount as u64.private;
    ix as u32.private;

record AuditJoin:
    owner as address.private;
    joiner as address.private;
    amount as u64.private;
    ix as u32.private;

record AuditTransfer:
    owner as address.private;
    sender as address.private;
    receiver as address.private;
    amount as u64.private;
    ix as u32.private;

record PieceStake:
    owner as address.private;
    amount as u64.private;
    challenger as address.private;
    opponent as address.private;
    staker as address.private;
    ix as u32.private;

record AuditStakeIn:
    owner as address.private;
    staker as address.private;
    amount_in as u64.private;
    challenger as address.private;
    opponent as address.private;
    game_multisig as address.private;
    ix as u32.private;

record AuditStakeOut:
    owner as address.private;
    staker as address.private;
    amount_in as u64.private;
    challenger as address.private;
    opponent as address.private;
    game_multisig as address.private;
    ix as u32.private;

record PieceClaim:
    owner as address.private;
    amount as u64.private;
    claimer as address.private;
    message_1 as field.private;
    message_2 as field.private;
    message_3 as field.private;
    message_4 as field.private;
    message_5 as field.private;
    challenger as address.private;
    opponent as address.private;
    ix as u32.private;

record ClaimSignature:
    owner as address.private;
    sig as signature.private;
    amount as u64.private;
    game_multisig as address.private;
    challenger as address.private;
    opponent as address.private;
    ix as u32.private;

record JointPieceTimeClaim:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;
    state_updater_address as address.private;
    message_1 as field.private;
    message_2 as field.private;
    message_3 as field.private;
    message_4 as field.private;
    message_5 as field.private;
    game_multisig as address.private;
    challenger as address.private;
    opponent as address.private;
    block_ht as u32.private;
    ix as u32.private;

record PieceJointStake:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;
    state_updater_address as address.private;
    block_ht as u32.private;
    ix as u32.private;

record JointPieceState:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;
    state_updater_address as address.private;
    message_1 as field.private;
    message_2 as field.private;
    message_3 as field.private;
    message_4 as field.private;
    message_5 as field.private;
    challenger as address.private;
    opponent as address.private;
    game_multisig as address.private;
    ix as u32.private;

record AuditJointStake:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;
    state_updater_address as address.private;
    block_ht as u32.private;
    challenger as address.private;
    opponent as address.private;
    game_multisig as address.private;
    ix as u32.private;

record JointPieceWinner:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;
    state_updater_address as address.private;
    challenger as address.private;
    opponent as address.private;
    game_multisig as address.private;
    winner as address.private;
    ix as u32.private;

record AuditJointPieceWinner:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;
    state_updater_address as address.private;
    challenger as address.private;
    opponent as address.private;
    game_multisig as address.private;
    winner as address.private;
    ix as u32.private;

record AuditTransferToWinner:
    owner as address.private;
    challenger as address.private;
    opponent as address.private;
    game_multisig as address.private;
    receiver as address.private;
    amount as u64.private;
    ix as u32.private;

record AuditPieceOwner:
    owner as address.private;
    piece_holder as address.private;
    amount as u64.private;
    ix as u32.private;


mapping supply:
	key as field.public;
	value as u64.public;

function mint_private:
    input r0 as u64.private;
    input r1 as address.private;
    cast r1 r0 0u32 into r2 as Piece.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r1 r0 1u32 into r3 as AuditMint.record;
    output r2 as Piece.record;
    output r3 as AuditMint.record;


function join_pieces:
    input r0 as Piece.record;
    input r1 as Piece.record;
    assert.eq self.caller self.signer;
    is.eq r0.owner self.signer into r2;
    assert.eq r2 true;
    is.eq r1.owner self.signer into r3;
    assert.eq r3 true;
    gt r0.amount 0u64 into r4;
    assert.eq r4 true;
    gt r1.amount 0u64 into r5;
    assert.eq r5 true;
    add r0.amount r1.amount into r6;
    cast self.signer r6 0u32 into r7 as Piece.record;
    add r0.amount r1.amount into r8;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls self.signer r8 32u32 into r9 as AuditJoin.record;
    output r7 as Piece.record;
    output r9 as AuditJoin.record;


function transfer_private:
    input r0 as Piece.record;
    input r1 as address.private;
    input r2 as u64.private;
    sub r0.amount r2 into r3;
    cast r0.owner r3 0u32 into r4 as Piece.record;
    cast r1 r2 0u32 into r5 as Piece.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r0.owner r1 r2 2u32 into r6 as AuditTransfer.record;
    output r4 as Piece.record;
    output r5 as Piece.record;
    output r6 as AuditTransfer.record;


function stake_transfer_in:
    input r0 as Piece.record;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as address.private;
    input r4 as address.private;
    input r5 as u64.private;
    input r6 as field.private;
    input r7 as field.private;
    input r8 as field.private;
    input r9 as field.private;
    input r10 as field.private;
    input r11 as signature.private;
    assert.eq r0.owner r1;
    is.eq r1 r2 into r12;
    not r12 into r13;
    is.eq r1 r2 into r14;
    or r13 r14 into r15;
    assert.eq r15 true;
    not r12 into r16;
    not r16 into r17;
    is.eq r1 r3 into r18;
    or r17 r18 into r19;
    assert.eq r19 true;
    assert.neq r2 r3;
    cast r4 r5 r1 r6 r7 r8 r9 r10 r2 r3 6u32 into r20 as PieceClaim.record;
    cast r1 r11 r5 r4 r2 r3 7u32 into r21 as ClaimSignature.record;
    cast r4 r5 r2 r3 r1 3u32 into r22 as PieceStake.record;
    sub r0.amount r5 into r23;
    cast r1 r23 0u32 into r24 as Piece.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r0.owner r5 r2 r3 r4 4u32 into r25 as AuditStakeIn.record;
    output r20 as PieceClaim.record;
    output r22 as PieceStake.record;
    output r21 as ClaimSignature.record;
    output r24 as Piece.record;
    output r25 as AuditStakeIn.record;


function stake_transfer_out:
    input r0 as PieceStake.record;
    input r1 as PieceClaim.record;
    input r2 as signature.private;
    assert.eq r0.owner r1.owner;
    assert.eq r0.challenger r1.challenger;
    assert.eq r0.opponent r1.opponent;
    assert.eq r0.amount r1.amount;
    cast r1.message_1 r1.message_2 r1.message_3 r1.message_4 r1.message_5 into r3 as Message;
    sign.verify r2 r1.claimer r3 into r4;
    assert.eq true r4;
    cast r1.claimer r1.amount 0u32 into r5 as Piece.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r1.claimer r1.amount r1.challenger r1.opponent r1.owner 5u32 into r6 as AuditStakeOut.record;
    output r5 as Piece.record;
    output r6 as AuditStakeOut.record;


function transfer_stakes_to_joint:
    input r0 as PieceStake.record;
    input r1 as PieceClaim.record;
    input r2 as PieceStake.record;
    input r3 as PieceClaim.record;
    input r4 as u32.private;
    assert.eq r1.owner r0.owner;
    assert.eq r2.owner r0.owner;
    assert.eq r3.owner r0.owner;
    assert.eq r1.amount r0.amount;
    assert.eq r2.amount r0.amount;
    assert.eq r3.amount r0.amount;
    assert.eq r1.challenger r0.challenger;
    assert.eq r2.challenger r0.challenger;
    assert.eq r3.challenger r0.challenger;
    assert.eq r1.opponent r0.opponent;
    assert.eq r2.opponent r0.opponent;
    assert.eq r3.opponent r0.opponent;
    assert.eq r1.claimer r0.challenger;
    assert.eq r3.claimer r2.opponent;
    add r0.amount r0.amount into r5;
    cast r0.owner r5 r0.opponent r0.challenger r4 9u32 into r6 as PieceJointStake.record;
    add r0.amount r0.amount into r7;
    cast r0.challenger r7 r0.opponent r0.challenger r1.message_1 r1.message_2 r1.message_3 r1.message_4 r1.message_5 r0.challenger r0.opponent r0.owner 10u32 into r8 as JointPieceState.record;
    add r0.amount r0.amount into r9;
    cast r0.owner r9 r0.opponent r0.challenger r3.message_1 r3.message_2 r3.message_3 r3.message_4 r3.message_5 r0.owner r0.challenger r0.opponent r4 8u32 into r10 as JointPieceTimeClaim.record;
    add r0.amount r0.amount into r11;
    cast r0.opponent r11 r0.opponent r0.challenger r4 r0.challenger r0.opponent r0.owner 11u32 into r12 as AuditJointStake.record;
    output r6 as PieceJointStake.record;
    output r10 as JointPieceTimeClaim.record;
    output r8 as JointPieceState.record;
    output r12 as AuditJointStake.record;


function joint_stake_state_update:
    input r0 as JointPieceState.record;
    input r1 as ClaimSignature.record;
    input r2 as address.private;
    assert.eq r0.owner r1.owner;
    assert.eq r0.state_updater_address r1.owner;
    assert.eq r0.state_updater_address r1.challenger;
    add r1.amount r1.amount into r3;
    assert.eq r0.amount r3;
    assert.eq r0.opponent r1.opponent;
    assert.eq r0.game_multisig r0.game_multisig;
    cast r0.message_1 r0.message_2 r0.message_3 r0.message_4 r0.message_5 into r4 as Message;
    sign.verify r1.sig r0.state_updater_address r4 into r5;
    assert.eq true r5;
    is.eq r2 r0.challenger into r6;
    not r6 into r7;
    is.eq r2 r0.challenger into r8;
    or r7 r8 into r9;
    assert.eq r9 true;
    not r6 into r10;
    not r10 into r11;
    is.eq r2 r0.opponent into r12;
    or r11 r12 into r13;
    assert.eq r13 true;
    cast r0.game_multisig r0.amount r0.time_claimer_address r0.state_updater_address r0.challenger r0.opponent r0.game_multisig r2 12u32 into r14 as JointPieceWinner.record;
    cast r0.game_multisig r0.amount r0.time_claimer_address r0.state_updater_address r0.challenger r0.opponent r0.game_multisig r2 13u32 into r15 as AuditJointPieceWinner.record;
    output r14 as JointPieceWinner.record;
    output r15 as AuditJointPieceWinner.record;


function joint_stake_transfer_to_winner:
    input r0 as JointPieceWinner.record;
    input r1 as PieceJointStake.record;
    input r2 as JointPieceTimeClaim.record;
    assert.eq r1.owner r0.owner;
    assert.eq r2.owner r0.owner;
    assert.eq r1.amount r0.amount;
    assert.eq r2.amount r0.amount;
    assert.eq r1.state_updater_address r0.challenger;
    assert.eq r2.challenger r0.challenger;
    assert.eq r1.time_claimer_address r0.opponent;
    assert.eq r2.opponent r0.opponent;
    is.eq r0.winner r1.time_claimer_address into r3;
    not r3 into r4;
    is.eq r0.winner r1.time_claimer_address into r5;
    or r4 r5 into r6;
    assert.eq r6 true;
    not r3 into r7;
    not r7 into r8;
    is.eq r0.winner r1.state_updater_address into r9;
    or r8 r9 into r10;
    assert.eq r10 true;
    cast r0.winner r0.amount 0u32 into r11 as Piece.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r0.challenger r0.opponent r0.owner r0.winner r0.amount 14u32 into r12 as AuditTransferToWinner.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r0.winner r0.amount 15u32 into r13 as AuditPieceOwner.record;
    output r11 as Piece.record;
    output r12 as AuditTransferToWinner.record;
    output r13 as AuditPieceOwner.record;


function joint_timeout_to_opponent:
    input r0 as PieceJointStake.record;
    input r1 as JointPieceTimeClaim.record;
    input r2 as signature.private;
    assert.eq r0.owner r1.owner;
    assert.eq r0.amount r1.amount;
    assert.eq r0.state_updater_address r1.challenger;
    assert.eq r0.time_claimer_address r1.opponent;
    cast r1.message_1 r1.message_2 r1.message_3 r1.message_4 r1.message_5 into r3 as Message;
    sign.verify r2 r1.time_claimer_address r3 into r4;
    assert.eq true r4;
    cast r1.opponent r1.amount 0u32 into r5 as Piece.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r1.challenger r1.opponent r1.owner r1.opponent r1.amount 14u32 into r6 as AuditTransferToWinner.record;
    output r5 as Piece.record;
    output r6 as AuditTransferToWinner.record;
