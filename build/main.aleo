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
    opponent as address.private;

record Answer:
    owner as address.private;
    game_address as address.private;
    nonce as field.private;
    answer as field.private;

record RevealedAnswer:
    owner as address.private;
    answer as field.private;
    nonce as field.private;

record Game:
    owner as address.private;
    player_one_comm as field.private;
    player_two_answer as field.private;
    total_pot as u64.private;
    player_one_address as address.private;
    player_two_address as address.private;
    game_state as field.private;


mapping puzz_supply:
	key as field.public;
	value as u128.public;


mapping games:
	key as address.public;
	value as u32.public;

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
    input r9 as field.private;
    assert.eq self.caller self.signer;
    assert.neq r1 r2;
    is.eq r5 0field into r10;
    is.eq r5 1field into r11;
    or r10 r11 into r12;
    assert.eq r12 true;
    cast r9 into r13 as scalar;
    commit.bhp256 r5 r13 into r14 as field;
    gt r4 0u64 into r15;
    assert.eq r15 true;
    assert.eq r4 r3.amount;
    cast r2 r0 self.caller into r16 as Key.record;
    cast self.caller r1 r9 r5 into r17 as Answer.record;
    cast r1 r14 1field r4 self.caller r2 0field into r18 as Game.record;
    call puzzle_account.aleo/mint_owner_rules_record r1 self.caller r2 r6 r6 into r19;
    call puzzle_token.aleo/mint_token_owner_rules_record r1 self.caller r2 r6 r6 into r20;
    call puzzle_token.aleo/stake_transfer_private_in r3 self.caller r1 r4 into r21 r22;
    async propose_game r1 into r23;
    output r17 as Answer.record;
    output r16 as Key.record;
    output r18 as Game.record;
    output r19 as puzzle_account.aleo/OwnerRules.record;
    output r20 as puzzle_token.aleo/TokenOwnerRules.record;
    output r21 as puzzle_token.aleo/Puzz.record;
    output r22 as puzzle_token.aleo/Puzz.record;
    output r23 as coinflip.aleo/propose_game.future;

finalize propose_game:
    input r0 as address.public;
    set block.height into games[r0];


function player_one_renege_proposal:
    input r0 as Game.record;
    input r1 as puzzle_token.aleo/TokenOwnerRules.record;
    input r2 as puzzle_token.aleo/Puzz.record;
    input r3 as u64.private;
    assert.eq self.caller self.signer;
    call puzzle_token.aleo/stake_transfer_private_out r2 self.caller r3 into r4 r5;
    output r4 as puzzle_token.aleo/Puzz.record;
    output r2 as puzzle_token.aleo/Puzz.record;


function submit_wager:
    input r0 as address.private;
    input r1 as address.private;
    input r2 as puzzle_token.aleo/Puzz.record;
    input r3 as u64.private;
    input r4 as field.private;
    input r5 as field.private;
    input r6 as signature.private;
    call puzzle_token.aleo/stake_transfer_private_in r2 self.caller r0 r3 into r7 r8;
    call puzzle_token.aleo/mint_token_owner_rules_record r0 self.caller r1 r6 r6 into r9;
    output r9 as puzzle_token.aleo/TokenOwnerRules.record;
    output r7 as puzzle_token.aleo/Puzz.record;
    output r8 as puzzle_token.aleo/Puzz.record;


function player_two_renege_proposal:
    input r0 as Game.record;
    input r1 as puzzle_account.aleo/OwnerRules.record;
    input r2 as puzzle_token.aleo/TokenOwnerRules.record;
    input r3 as puzzle_token.aleo/Puzz.record;
    input r4 as u64.private;
    input r5 as signature.private;
    input r6 as field.private;
    assert.eq self.caller self.signer;
    call puzzle_token.aleo/stake_transfer_private_out r3 self.caller r4 into r7 r8;
    output r7 as puzzle_token.aleo/Puzz.record;
    output r8 as puzzle_token.aleo/Puzz.record;


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
    assert.eq r0.game_state 0field;
    is.eq r5 0field into r8;
    is.eq r5 1field into r9;
    or r8 r9 into r10;
    assert.eq r10 true;
    cast r0.owner r0.player_one_comm r5 r0.total_pot r0.player_one_address r0.player_two_address 1field into r11 as Game.record;
    call puzzle_account.aleo/mint_owner_rules_record r0.owner self.caller r1.signer_address r6 r6 into r12;
    async accept_game r0.owner into r13;
    output r11 as Game.record;
    output r12 as puzzle_account.aleo/OwnerRules.record;
    output r13 as coinflip.aleo/accept_game.future;

finalize accept_game:
    input r0 as address.public;
    get games[r0] into r1;
    gt block.height r1 into r2;
    assert.eq r2 true;
    set block.height into games[r0];


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
    input r3 as puzzle_token.aleo/TokenOwnerRules.record;
    assert.eq self.caller self.signer;
    assert.eq r0.game_state 1field;
    is.neq r1.answer r0.player_two_answer into r4;
    call puzzle_token.aleo/stake_transfer_private_out r2 self.caller r0.total_pot into r5 r6;
    cast self.caller self.caller r0.total_pot into r7 as NotifyGameOver.record;
    cast r0.player_two_address self.caller r0.total_pot into r8 as NotifyGameOver.record;
    call puzzle_token.aleo/stake_transfer_private_out r2 self.caller r0.total_pot into r9 r10;
    cast self.caller r0.player_two_address r0.total_pot into r11 as NotifyGameOver.record;
    cast r0.player_two_address r0.player_two_address r0.total_pot into r12 as NotifyGameOver.record;
    ternary r4 r7.owner r11.owner into r13;
    ternary r4 r7.winner r11.winner into r14;
    ternary r4 r7.total_pot r11.total_pot into r15;
    cast r13 r14 r15 into r16 as NotifyGameOver.record;
    ternary r4 r8.owner r12.owner into r17;
    ternary r4 r8.winner r12.winner into r18;
    ternary r4 r8.total_pot r12.total_pot into r19;
    cast r17 r18 r19 into r20 as NotifyGameOver.record;
    ternary r4 r0.owner r0.owner into r21;
    async finish_game r21 into r22;
    output r16 as NotifyGameOver.record;
    output r20 as NotifyGameOver.record;
    output r22 as coinflip.aleo/finish_game.future;

finalize finish_game:
    input r0 as address.public;
    get games[r0] into r1;
    gt block.height r1 into r2;
    assert.eq r2 true;
    set block.height into games[r0];


function claim_total_pot:
    input r0 as Game.record;
    input r1 as RevealedAnswer.record;
    input r2 as puzzle_token.aleo/Puzz.record;
    input r3 as puzzle_token.aleo/TokenOwnerRules.record;
    input r4 as signature.private;
    input r5 as field.private;
    assert.eq self.caller self.signer;
    call puzzle_token.aleo/stake_transfer_private_out r2 self.caller r0.total_pot into r6 r7;
    async claim_total_pot r0.owner into r8;
    output r6 as puzzle_token.aleo/Puzz.record;
    output r7 as puzzle_token.aleo/Puzz.record;
    output r8 as coinflip.aleo/claim_total_pot.future;

finalize claim_total_pot:
    input r0 as address.public;
    get games[r0] into r1;
    add r1 1000u32 into r2;
    gt block.height r2 into r3;
    assert.eq r3 true;
    set block.height into games[r0];
