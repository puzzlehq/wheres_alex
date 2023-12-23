program multiparty_pvp_utils_v015.aleo;

struct Mssage:
    field_1 as field;
    field_2 as field;
    field_3 as field;
    field_4 as field;
    field_5 as field;

record Answer:
    owner as address.private;
    challenger_address as address.private;
    opponent_address as address.private;
    game_multisig as address.private;
    amount as u64.private;
    nonce as field.private;
    answer as field.private;
    message_1 as field.private;
    message_2 as field.private;
    message_3 as field.private;
    message_4 as field.private;
    message_5 as field.private;
    ix as u32.private;

record AuditMintAnswer:
    owner as address.private;
    answer_owner as address.private;
    challenger_address as address.private;
    opponent_address as address.private;
    game_multisig as address.private;
    amount as u64.private;
    nonce as field.private;
    answer as field.private;
    message_1 as field.private;
    message_2 as field.private;
    message_3 as field.private;
    message_4 as field.private;
    message_5 as field.private;
    ix as u32.private;

record RevealAnswer:
    owner as address.private;
    challenger_address as address.private;
    opponent_address as address.private;
    game_multisig as address.private;
    amount as u64.private;
    nonce as field.private;
    answer as field.private;
    sig as signature.private;
    ix as u32.private;

record AuditRevealAnswer:
    owner as address.private;
    challenger_address as address.private;
    opponent_address as address.private;
    game_multisig as address.private;
    amount as u64.private;
    nonce as field.private;
    answer as field.private;
    sig as signature.private;
    ix as u32.private;

record Key:
    owner as address.private;
    seed as field.private;
    amount as u64.private;
    challenger as address.private;
    opponent as address.private;
    game_multisig as address.private;
    ix as u32.private;

record AuditKey:
    owner as address.private;
    seed as field.private;
    amount as u64.private;
    challenger as address.private;
    opponent as address.private;
    game_multisig as address.private;
    ix as u32.private;


function mint_answer:
    input r0 as address.private;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as u64.private;
    input r4 as field.private;
    input r5 as field.private;
    input r6 as field.private;
    input r7 as field.private;
    input r8 as field.private;
    input r9 as field.private;
    input r10 as field.private;
    input r11 as signature.private;
    cast r6 r7 r8 r9 r10 into r12 as Mssage;
    sign.verify r11 r0 r12 into r13;
    assert.eq true r13;
    cast r0 r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 1u32 into r14 as Answer.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r0 r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 2u32 into r15 as AuditMintAnswer.record;
    output r14 as Answer.record;
    output r15 as AuditMintAnswer.record;


function mint_multisig_key:
    input r0 as field.private;
    input r1 as u64.private;
    input r2 as address.private;
    input r3 as address.private;
    input r4 as address.private;
    cast r3 r0 r1 r2 r3 r4 5u32 into r5 as Key.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r0 r1 r2 r3 r4 6u32 into r6 as AuditKey.record;
    output r5 as Key.record;
    output r6 as AuditKey.record;


function reveal_answer:
    input r0 as Answer.record;
    input r1 as signature.private;
    assert.eq r0.owner r0.challenger_address;
    cast r0.message_1 r0.message_2 r0.message_3 r0.message_4 r0.message_5 into r2 as Mssage;
    sign.verify r1 r0.challenger_address r2 into r3;
    assert.eq true r3;
    cast r0.game_multisig r0.challenger_address r0.opponent_address r0.game_multisig r0.amount r0.nonce r0.answer r1 3u32 into r4 as RevealAnswer.record;
    cast aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls r0.challenger_address r0.opponent_address r0.game_multisig r0.amount r0.nonce r0.answer r1 4u32 into r5 as AuditRevealAnswer.record;
    output r4 as RevealAnswer.record;
    output r5 as AuditRevealAnswer.record;
