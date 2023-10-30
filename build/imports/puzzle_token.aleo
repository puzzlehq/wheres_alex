program puzzle_token.aleo;

record Puzz:
    owner as address.private;
    amount as u64.private;

record TokenOwnerRules:
    owner as address.private;
    m as u8.private;
    n as u8.private;
    signer_address_one as address.private;
    signer_address_two as address.private;
    signer_one_signature as signature.private;
    signer_two_signature as signature.private;

record PuzzStake:
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
    cast r1 r0 into r2 as Puzz.record;
    output r2 as Puzz.record;


function transfer_private:
    input r0 as Puzz.record;
    input r1 as address.private;
    input r2 as u64.private;
    cast r1 r2 into r3 as Puzz.record;
    sub r0.amount r2 into r4;
    cast self.caller r4 into r5 as Puzz.record;
    output r3 as Puzz.record;
    output r5 as Puzz.record;


function stake_transfer_private_out:
    input r0 as Puzz.record;
    input r1 as address.private;
    input r2 as u64.private;
    cast r1 r2 into r3 as Puzz.record;
    sub r0.amount r2 into r4;
    cast self.caller r4 into r5 as Puzz.record;
    output r3 as Puzz.record;
    output r5 as Puzz.record;
