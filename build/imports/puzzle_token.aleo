program puzzle_token.aleo;

record Puzz:
    owner as address.private;
    amount as u64.private;

record ClaimRecord:
    owner as address.private;
    claimable as boolean.private;


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
