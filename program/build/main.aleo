import cflip_testing_123_token.aleo;
import puzz_testing_acct_123.aleo;
program cflip_gm_aleo_testing_123.aleo;














record NotifyKeyRecord:
    owner as address.private;
    keys as field.private;
    game_address as address.private;
    challenge_amount as u64.private;
    opponent as address.private;

record NotifyRevealedAnswer:
    owner as address.private;
    answer as field.private;
    game_address as address.private;
    opponent as address.private;

record NotifyGameOver:
    owner as address.private;
    winner as address.private;
    total_pot as u64.private;
    game_address as address.private;
    opponent as address.private;

record NotifyAcceptGame:
    owner as address.private;
    total_pot as u64.private;
    game_address as address.private;
    opponent as address.private;

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
    call cflip_testing_123_token.aleo/mint r0 r1 into r2;
    output r2 as cflip_testing_123_token.aleo/Piece.record;


function propose_game:
    input r0 as field.private;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as cflip_testing_123_token.aleo/Piece.record;
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
    gte r3.amount r4 into r16;
    assert.eq r16 true;
    cast r2 r0 r1 r4 self.caller into r17 as NotifyKeyRecord.record;
    cast self.caller r1 r9 r5 into r18 as Answer.record;
    cast r1 r14 1field r4 self.caller r2 0field into r19 as Game.record;
    call puzz_testing_acct_123.aleo/mint_owner_rules_record r1 self.caller r2 r6 r6 into r20;
    call cflip_testing_123_token.aleo/stake_transfer_private_in r3 self.caller r1 r4 r7 r6 into r21 r22 r23;
    async propose_game r1 into r24;
    output r18 as Answer.record;
    output r17 as NotifyKeyRecord.record;
    output r19 as Game.record;
    output r20 as puzz_testing_acct_123.aleo/OwnerRules.record;
    output r21 as cflip_testing_123_token.aleo/PieceClaim.record;
    output r22 as cflip_testing_123_token.aleo/Piece.record;
    output r23 as cflip_testing_123_token.aleo/Piece.record;
    output r24 as cflip_gm_aleo_testing_123.aleo/propose_game.future;

finalize propose_game:
    input r0 as address.public;
    set block.height into games[r0];


function player_one_renege_proposal:
    input r0 as Game.record;
    input r1 as cflip_testing_123_token.aleo/TokenOwnerRules.record;
    input r2 as cflip_testing_123_token.aleo/PieceClaim.record;
    input r3 as cflip_testing_123_token.aleo/Piece.record;
    input r4 as u64.private;
    assert.eq self.caller self.signer;
    call cflip_testing_123_token.aleo/stake_transfer_private_out r3 r2 self.caller r4 into r5 r6;
    output r5 as cflip_testing_123_token.aleo/Piece.record;
    output r3 as cflip_testing_123_token.aleo/Piece.record;


function submit_wager:
    input r0 as address.private;
    input r1 as address.private;
    input r2 as cflip_testing_123_token.aleo/Piece.record;
    input r3 as u64.private;
    input r4 as field.private;
    input r5 as signature.private;
    call cflip_testing_123_token.aleo/stake_transfer_private_in r2 self.caller r0 r3 r4 r5 into r6 r7 r8;
    output r6 as cflip_testing_123_token.aleo/PieceClaim.record;
    output r7 as cflip_testing_123_token.aleo/Piece.record;
    output r8 as cflip_testing_123_token.aleo/Piece.record;


function player_two_renege_proposal:
    input r0 as Game.record;
    input r1 as cflip_testing_123_token.aleo/PieceClaim.record;
    input r2 as cflip_testing_123_token.aleo/Piece.record;
    input r3 as u64.private;
    assert.eq self.caller self.signer;
    call cflip_testing_123_token.aleo/stake_transfer_private_out r2 r1 self.caller r3 into r4 r5;
    output r4 as cflip_testing_123_token.aleo/Piece.record;
    output r5 as cflip_testing_123_token.aleo/Piece.record;


function accept_game:
    input r0 as Game.record;
    input r1 as field.private;
    assert.eq self.caller self.signer;
    assert.eq r0.game_state 0field;
    is.eq r1 0field into r2;
    is.eq r1 1field into r3;
    or r2 r3 into r4;
    assert.eq r4 true;
    cast r0.owner r0.player_one_comm r1 r0.total_pot r0.player_one_address r0.player_two_address 1field into r5 as Game.record;
    cast r0.player_one_address r0.total_pot r0.owner r0.player_one_address into r6 as NotifyAcceptGame.record;
    async accept_game r0.owner into r7;
    output r5 as Game.record;
    output r6 as NotifyAcceptGame.record;
    output r7 as cflip_gm_aleo_testing_123.aleo/accept_game.future;

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
    cast r2 r0.answer r1 r0.owner into r4 as NotifyRevealedAnswer.record;
    output r3 as RevealedAnswer.record;
    output r4 as NotifyRevealedAnswer.record;


function finish_game:
    input r0 as Game.record;
    input r1 as RevealedAnswer.record;
    input r2 as cflip_testing_123_token.aleo/Piece.record;
    input r3 as cflip_testing_123_token.aleo/PieceClaim.record;
    assert.eq self.caller self.signer;
    assert.eq r0.game_state 1field;
    is.eq r1.answer r0.player_two_answer into r4;
    call cflip_testing_123_token.aleo/stake_transfer_private_out r2 r3 r0.player_two_address r0.total_pot into r5 r6;
    cast r0.player_one_address r0.player_two_address r0.total_pot r0.owner r0.player_two_address into r7 as NotifyGameOver.record;
    cast r0.player_two_address r0.player_two_address r0.total_pot r0.owner r0.player_one_address into r8 as NotifyGameOver.record;
    call cflip_testing_123_token.aleo/stake_transfer_private_out r2 r3 r0.player_one_address r0.total_pot into r9 r10;
    cast r0.player_one_address r0.player_one_address r0.total_pot r0.owner r0.player_two_address into r11 as NotifyGameOver.record;
    cast r0.player_two_address r0.player_one_address r0.total_pot r0.owner r0.player_one_address into r12 as NotifyGameOver.record;
    ternary r4 r7.owner r11.owner into r13;
    ternary r4 r7.winner r11.winner into r14;
    ternary r4 r7.total_pot r11.total_pot into r15;
    ternary r4 r7.game_address r11.game_address into r16;
    ternary r4 r7.opponent r11.opponent into r17;
    cast r13 r14 r15 r16 r17 into r18 as NotifyGameOver.record;
    ternary r4 r8.owner r12.owner into r19;
    ternary r4 r8.winner r12.winner into r20;
    ternary r4 r8.total_pot r12.total_pot into r21;
    ternary r4 r8.game_address r12.game_address into r22;
    ternary r4 r8.opponent r12.opponent into r23;
    cast r19 r20 r21 r22 r23 into r24 as NotifyGameOver.record;
    ternary r4 r0.owner r0.owner into r25;
    async finish_game r25 into r26;
    output r18 as NotifyGameOver.record;
    output r24 as NotifyGameOver.record;
    output r26 as cflip_gm_aleo_testing_123.aleo/finish_game.future;

finalize finish_game:
    input r0 as address.public;
    get games[r0] into r1;
    gt block.height r1 into r2;
    assert.eq r2 true;
    set block.height into games[r0];


function claim_total_pot:
    input r0 as Game.record;
    input r1 as RevealedAnswer.record;
    input r2 as cflip_testing_123_token.aleo/Piece.record;
    input r3 as cflip_testing_123_token.aleo/PieceClaim.record;
    assert.eq self.caller self.signer;
    call cflip_testing_123_token.aleo/stake_transfer_private_out r2 r3 self.caller r0.total_pot into r4 r5;
    cast r0.player_one_address r0.player_two_address r0.total_pot r0.owner r0.player_two_address into r6 as NotifyGameOver.record;
    cast r0.player_two_address r0.player_two_address r0.total_pot r0.owner r0.player_one_address into r7 as NotifyGameOver.record;
    async claim_total_pot r0.owner into r8;
    output r4 as cflip_testing_123_token.aleo/Piece.record;
    output r5 as cflip_testing_123_token.aleo/Piece.record;
    output r6 as NotifyGameOver.record;
    output r7 as NotifyGameOver.record;
    output r8 as cflip_gm_aleo_testing_123.aleo/claim_total_pot.future;

finalize claim_total_pot:
    input r0 as address.public;
    get games[r0] into r1;
    add r1 1000u32 into r2;
    gt block.height r2 into r3;
    assert.eq r3 true;
    set block.height into games[r0];
