import puzzle_token.aleo;
import puzzle_account.aleo;
program coinflip.aleo;






record Key:
    owner as address.private;
    keys as field.private;

record Answer:
    owner as address.private;
    game_address as address.private;
    N as field.private;
    answer as field.private;

record RevealedAnswer:
    owner as address.private;
    answer as field.private;

record Game:
    owner as address.private;
    answer_1 as field.private;
    answer_2 as field.private;
    wager as u64.private;


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
    input r5 as field.private;
    input r6 as signature.private;
    input r7 as u8.private;
    input r8 as field.private;
    assert.neq r1 r2;
    gt r4 0u64 into r9;
    assert.eq r9 true;
    assert.eq r4 r3.amount;
    cast r2 r0 into r10 as Key.record;
    cast self.caller r1 1field r5 into r11 as Answer.record;
    cast r1 r5 1field r4 into r12 as Game.record;
    call puzzle_account.aleo/mint_owner_rules_record r1 self.caller r2 into r13;
    call puzzle_account.aleo/mint_claim_record r1 r4 into r14;
    call puzzle_token.aleo/transfer_private r3 r1 r4 into r15 r16;
    output r11 as Answer.record;
    output r14 as puzzle_account.aleo/Claim.record;
    output r10 as Key.record;
    output r12 as Game.record;
    output r13 as puzzle_account.aleo/OwnerRules.record;
    output r16 as puzzle_token.aleo/Puzz.record;
    output r15 as puzzle_token.aleo/Puzz.record;


function player_one_renege_proposal:
    input r0 as Game.record;
    input r1 as puzzle_account.aleo/OwnerRules.record;
    input r2 as puzzle_account.aleo/Claim.record;
    input r3 as puzzle_token.aleo/Puzz.record;
    input r4 as u64.private;
    call puzzle_token.aleo/transfer_private r3 self.caller r4 into r5 r6;


function submit_wager:
    input r0 as address.private;
    input r1 as puzzle_token.aleo/Puzz.record;
    input r2 as u64.private;
    call puzzle_token.aleo/transfer_private r1 r0 r2 into r3 r4;
    call puzzle_account.aleo/mint_claim_record r0 r2 into r5;
    output r5 as puzzle_account.aleo/Claim.record;
    output r3 as puzzle_token.aleo/Puzz.record;
    output r4 as puzzle_token.aleo/Puzz.record;


function player_two_renege_proposal:
    input r0 as Game.record;
    input r1 as puzzle_account.aleo/OwnerRules.record;
    input r2 as puzzle_account.aleo/Claim.record;
    input r3 as puzzle_token.aleo/Puzz.record;
    input r4 as u64.private;
    call puzzle_token.aleo/transfer_private r3 self.caller r4 into r5 r6;


function accept_game:
    input r0 as Game.record;
    input r1 as puzzle_account.aleo/Claim.record;
    input r2 as puzzle_account.aleo/Claim.record;
    input r3 as puzzle_token.aleo/Puzz.record;
    input r4 as puzzle_account.aleo/OwnerRules.record;
    input r5 as field.private;
    input r6 as signature.private;
    input r7 as field.private;
    assert.eq r1.amount r2.amount;
    assert.eq r1.owner r2.owner;
    assert.eq r0.owner r1.owner;
    cast r0.owner r0.answer_1 r5 r0.wager into r8 as Game.record;
    call puzzle_account.aleo/mint_owner_rules_record r0.owner self.caller r1.signer_address into r9;
    output r8 as Game.record;
    output r9 as puzzle_account.aleo/OwnerRules.record;


function reveal_answer:
    input r0 as Answer.record;
    cast r0.owner r0.answer into r1 as RevealedAnswer.record;
    output r1 as RevealedAnswer.record;


function finish_game:
    input r0 as Game.record;
    input r1 as RevealedAnswer.record;


function claim_wager:
