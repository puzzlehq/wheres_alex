import puzzle_token.aleo;
import puzzle_account.aleo;
program coinflip.aleo;










record NotifyRevealedAnswer:
    owner as address.private;
    answer as field.private;

record NotifyGameOver:
    owner as address.private;
    winner as address.private;
    total_pot as u64.private;

record Key:
    owner as address.private;
    keys as field.private;

record Answer:
    owner as address.private;
    game_address as address.private;
    nonce as scalar.private;
    answer as field.private;

record RevealedAnswer:
    owner as address.private;
    answer as field.private;
    nonce as scalar.private;

record Game:
    owner as address.private;
    player_one_comm as field.private;
    player_two_answer as field.private;
    total_pot as u64.private;
    player_one_address as address.private;
    player_two_address as address.private;


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
    input r7 as field.private;
    input r8 as u8.private;
    input r9 as scalar.private;
    assert.eq self.caller self.signer;
    assert.neq r1 r2;
    commit.bhp256 r5 r9 into r10 as field;
    gt r4 0u64 into r11;
    assert.eq r11 true;
    assert.eq r4 r3.amount;
    cast r2 r0 into r12 as Key.record;
    cast self.caller r1 r9 r5 into r13 as Answer.record;
    cast r1 r10 1field r4 self.caller r2 into r14 as Game.record;
    call puzzle_account.aleo/mint_owner_rules_record r1 self.caller r2 r6 r6 into r15;
    call puzzle_account.aleo/mint_claim_record r1 r4 into r16;
    call puzzle_token.aleo/puzz_transfer_private r3 r1 r4 into r17 r18;
    output r13 as Answer.record;
    output r16 as puzzle_account.aleo/Claim.record;
    output r12 as Key.record;
    output r14 as Game.record;
    output r15 as puzzle_account.aleo/OwnerRules.record;
    output r18 as puzzle_token.aleo/Puzz.record;
    output r17 as puzzle_token.aleo/Puzz.record;


function player_one_renege_proposal:
    input r0 as Game.record;
    input r1 as puzzle_account.aleo/OwnerRules.record;
    input r2 as puzzle_account.aleo/Claim.record;
    input r3 as puzzle_token.aleo/Puzz.record;
    input r4 as u64.private;
    assert.eq self.caller self.signer;
    call puzzle_token.aleo/puzz_transfer_private r3 self.caller r4 into r5 r6;


function submit_wager:
    input r0 as address.private;
    input r1 as puzzle_token.aleo/Puzz.record;
    input r2 as u64.private;
    call puzzle_token.aleo/puzz_transfer_private r1 r0 r2 into r3 r4;
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
    assert.eq self.caller self.signer;
    call puzzle_token.aleo/puzz_transfer_private r3 self.caller r4 into r5 r6;


function accept_game:
    input r0 as Game.record;
    input r1 as puzzle_account.aleo/Claim.record;
    input r2 as puzzle_account.aleo/Claim.record;
    input r3 as puzzle_token.aleo/Puzz.record;
    input r4 as puzzle_account.aleo/OwnerRules.record;
    input r5 as field.private;
    input r6 as signature.private;
    input r7 as field.private;
    assert.eq self.caller self.signer;
    assert.eq r1.amount r2.amount;
    assert.eq r1.owner r2.owner;
    assert.eq r0.owner r1.owner;
    cast r0.owner r0.player_one_comm r5 r0.total_pot r0.player_one_address r0.player_two_address into r8 as Game.record;
    call puzzle_account.aleo/mint_owner_rules_record r0.owner self.caller r1.signer_address r6 r6 into r9;
    output r8 as Game.record;
    output r9 as puzzle_account.aleo/OwnerRules.record;


function reveal_answer:
    input r0 as Answer.record;
    input r1 as address.private;
    input r2 as address.private;
    assert.eq self.caller self.signer;
    cast r1 r0.answer r0.nonce into r3 as RevealedAnswer.record;
    cast r0.owner r0.answer into r4 as NotifyRevealedAnswer.record;
    cast r2 r0.answer into r5 as NotifyRevealedAnswer.record;
    output r3 as RevealedAnswer.record;
    output r4 as NotifyRevealedAnswer.record;
    output r5 as NotifyRevealedAnswer.record;


function finish_game:
    input r0 as Game.record;
    input r1 as RevealedAnswer.record;
    input r2 as puzzle_token.aleo/Puzz.record;
    assert.eq self.caller self.signer;
    is.eq r1.answer 1field into r3;
    call puzzle_token.aleo/puzz_transfer_private r2 r1.owner r0.total_pot into r4 r5;
    cast self.caller self.caller r0.total_pot into r6 as NotifyGameOver.record;
    cast r0.player_two_address self.caller r0.total_pot into r7 as NotifyGameOver.record;
    call puzzle_token.aleo/puzz_transfer_private r2 self.caller r0.total_pot into r8 r9;
    cast self.caller r0.player_two_address r0.total_pot into r10 as NotifyGameOver.record;
    cast r0.player_two_address r0.player_two_address r0.total_pot into r11 as NotifyGameOver.record;
    ternary r3 r6.owner r10.owner into r12;
    ternary r3 r6.winner r10.winner into r13;
    ternary r3 r6.total_pot r10.total_pot into r14;
    cast r12 r13 r14 into r15 as NotifyGameOver.record;
    ternary r3 r7.owner r11.owner into r16;
    ternary r3 r7.winner r11.winner into r17;
    ternary r3 r7.total_pot r11.total_pot into r18;
    cast r16 r17 r18 into r19 as NotifyGameOver.record;
    output r15 as NotifyGameOver.record;
    output r19 as NotifyGameOver.record;


function claim_wager:
    assert.eq self.caller self.signer;
