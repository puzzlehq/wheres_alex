import puzzle_token.aleo;
import puzzle_account.aleo;
program coinflip.aleo;





record Claim:
    owner as address.private;
    amount as u64.private;

record Key:
    owner as address.private;
    keys as field.private;

record Answer:
    owner as address.private;
    N as field.private;
    answer as u32.private;

record GameRecord:
    owner as address.private;
    answer_1 as field.private;
    answer_2 as field.private;


mapping puzz_supply:
	key as field.public;
	value as u128.public;


mapping balances:
	key as address.public;
	value as u64.public;

function mint_token:
    input r0 as u64.private;
    input r1 as address.private;
    call puzzle_token.aleo/mint r0 r1 into r2;
    output r2 as puzzle_token.aleo/Puzz.record;


function propose_game:
    input r0 as field.private;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as puzzle_token.aleo/Puzz.record;
    input r4 as u64.private;
    input r5 as u32.private;
    input r6 as signature.private;
    input r7 as u8.private;
    input r8 as field.private;
    gt r4 0u64 into r9;
    assert.eq r9 true;
    assert.eq r4 r3.amount;
    cast r2 r0 into r10 as Key.record;
    cast self.caller 1field r5 into r11 as Answer.record;
    call puzzle_account.aleo/mint_owner_rules_record r1 self.caller r2 into r12;
    cast self.caller r4 into r13 as Claim.record;
    call puzzle_token.aleo/transfer_private r3 r1 r4 into r14 r15;
    output r11 as Answer.record;
    output r13 as Claim.record;
    output r10 as Key.record;
    output r12 as puzzle_account.aleo/OwnerRules.record;
    output r15 as puzzle_token.aleo/Puzz.record;
    output r14 as puzzle_token.aleo/Puzz.record;


function player_one_renege_proposal:
    input r0 as GameRecord.record;
    input r1 as puzzle_account.aleo/OwnerRules.record;
    input r2 as puzzle_token.aleo/ClaimRecord.record;
    input r3 as address.private;


function submit_wager:
    input r0 as address.private;
    input r1 as puzzle_token.aleo/Puzz.record;
    input r2 as u64.private;
    call puzzle_token.aleo/transfer_private r1 r0 r2 into r3 r4;
    cast self.caller r2 into r5 as Claim.record;
    output r5 as Claim.record;
    output r3 as puzzle_token.aleo/Puzz.record;
    output r4 as puzzle_token.aleo/Puzz.record;


function player_two_renege_proposal:


function accept_game:


function reveal_answer:


function finish_game:


function claim_wager:
