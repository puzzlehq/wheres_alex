program puzzle_token.aleo;

record Puzz:
    owner as address.private;
    amount as u64.private;

record PuzzClaim:
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
    is_claimable as boolean.private;

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


function mint_token_owner_rules_record:
    input r0 as address.private;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as signature.private;
    input r4 as signature.private;
    cast r0 2u8 2u8 r1 r2 r3 r4 false into r5 as TokenOwnerRules.record;
    output r5 as TokenOwnerRules.record;


function puzz_transfer_private:
    input r0 as Puzz.record;
    input r1 as address.private;
    input r2 as u64.private;
    cast r1 r2 into r3 as Puzz.record;
    sub r0.amount r2 into r4;
    cast self.caller r4 into r5 as Puzz.record;
    output r3 as Puzz.record;
    output r5 as Puzz.record;


function stake_transfer_private_in:
    input r0 as Puzz.record;
    input r1 as address.private;
    input r2 as u64.private;
    cast self.caller r2 into r3 as PuzzClaim.record;
    cast r1 r2 into r4 as Puzz.record;
    sub r0.amount r2 into r5;
    cast self.caller r5 into r6 as Puzz.record;
    output r3 as PuzzClaim.record;
    output r4 as Puzz.record;
    output r6 as Puzz.record;


function stake_transfer_private_out:
    input r0 as Puzz.record;
    input r1 as TokenOwnerRules.record;
    input r2 as PuzzClaim.record;
    input r3 as signature.private;
    input r4 as field.private;
    input r5 as u64.private;
    sign.verify r3 r2.owner r4 into r6;
    assert.eq r6 true;
    cast r2.owner r5 into r7 as Puzz.record;
    sub r0.amount r5 into r8;
    cast r2.owner r8 into r9 as Puzz.record;
    output r7 as Puzz.record;
    output r9 as Puzz.record;
