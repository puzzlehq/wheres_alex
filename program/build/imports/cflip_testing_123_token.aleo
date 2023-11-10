program cflip_testing_123_token.aleo;

record Piece:
    owner as address.private;
    amount as u64.private;

record PieceClaim:
    owner as address.private;
    amount as u64.private;
    claimer as address.private;
    msg as field.private;
    sig as signature.private;
    is_claimable as boolean.private;

record JointPieceClaim:
    owner as address.private;
    amount as u64.private;
    time_claimer_address as address.private;
    is_claimable as boolean.private;

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

record TokenClaim:
    owner as address.private;
    amount as u64.private;
    claimable as boolean.private;
    signer_address as address.private;


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
    cast r2 r3 r1 r4 r5 true into r6 as PieceClaim.record;
    cast r2 r3 into r7 as Piece.record;
    sub r0.amount r3 into r8;
    cast r1 r8 into r9 as Piece.record;
    output r6 as PieceClaim.record;
    output r7 as Piece.record;
    output r9 as Piece.record;


function stake_transfer_renege:
    input r0 as Piece.record;
    input r1 as PieceClaim.record;
    input r2 as address.private;
    input r3 as address.private;
    input r4 as u64.private;
    assert.eq r1.is_claimable true;
    cast r3 r4 into r5 as Piece.record;
    sub r0.amount r4 into r6;
    cast r2 r6 into r7 as Piece.record;
    output r5 as Piece.record;
    output r7 as Piece.record;


function consume_claim_mint_joint_record:
    input r0 as PieceClaim.record;
    input r1 as PieceClaim.record;
    input r2 as address.private;
    input r3 as address.private;
    cast r0.owner r0.amount r0.claimer r0.msg r0.sig false into r4 as PieceClaim.record;
    cast r1.owner r1.amount r1.claimer r1.msg r1.sig false into r5 as PieceClaim.record;
    add r0.amount r1.amount into r6;
    cast r2 r6 r3 false into r7 as JointPieceClaim.record;
    output r4 as PieceClaim.record;
    output r5 as PieceClaim.record;
    output r7 as JointPieceClaim.record;


function transfer_winner:
    input r0 as Piece.record;
    input r1 as JointPieceClaim.record;
    input r2 as address.private;
    assert.eq r1.is_claimable true;
    cast r2 r1.amount into r3 as Piece.record;
    sub r0.amount r1.amount into r4;
    cast r2 r4 into r5 as Piece.record;
    cast r2 r1.amount r1.time_claimer_address false into r6 as JointPieceClaim.record;
    output r3 as Piece.record;
    output r5 as Piece.record;


function stake_transfer_private_out:
    input r0 as Piece.record;
    input r1 as PieceClaim.record;
    input r2 as address.private;
    input r3 as u64.private;
    sign.verify r1.sig r1.claimer r1.msg into r4;
    assert.eq r4 true;
    gte r1.amount r3 into r5;
    assert.eq r5 true;
    assert.eq r1.claimer r2;
    assert.eq r0.owner r1.owner;
    cast r2 r3 into r6 as Piece.record;
    sub r0.amount r3 into r7;
    cast r0.owner r7 into r8 as Piece.record;
    output r6 as Piece.record;
    output r8 as Piece.record;
