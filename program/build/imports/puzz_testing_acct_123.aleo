program puzz_testing_acct_123.aleo;

record Claim:
    owner as address.private;
    amount as u64.private;
    claimable as boolean.private;
    signer_address as address.private;

record PuzzAcctStake:
    owner as address.private;
    amount as u64.private;

record OwnerRules:
    owner as address.private;
    m as u8.private;
    n as u8.private;
    signer_address_one as address.private;
    signer_address_two as address.private;
    is_claimable as boolean.private;
    signer_one_signature as signature.private;
    signer_two_signature as signature.private;

record OwnerRulesClaim:
    owner as address.private;
    m as u8.private;
    n as u8.private;
    signer_address_one as address.private;
    signer_address_two as address.private;
    is_claimable as boolean.private;

record Signatures:
    owner as address.private;
    message_one as field.private;
    message_two as field.private;
    message_three as field.private;
    message_four as field.private;
    signed_message as signature.private;
    signer_address as address.private;


function mint_claim_record:
    input r0 as address.private;
    input r1 as u64.private;
    cast r0 r1 true self.caller into r2 as Claim.record;
    output r2 as Claim.record;


function mint_owner_rules_record:
    input r0 as address.private;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as signature.private;
    input r4 as signature.private;
    cast r0 2u8 2u8 r1 r2 false r3 r4 into r5 as OwnerRules.record;
    output r5 as OwnerRules.record;


function consume_owner_rules_record:
    input r0 as OwnerRules.record;
    output r0.m as u8.private;
    output r0.n as u8.private;
    output r0.signer_address_one as address.private;
    output r0.signer_address_two as address.private;


function mint_signatures_record:
    input r0 as field.private;
    input r1 as field.private;
    input r2 as field.private;
    input r3 as field.private;
    input r4 as signature.private;
    input r5 as address.private;
    cast self.caller r0 r1 r2 r3 r4 r5 into r6 as Signatures.record;
    output r6 as Signatures.record;


function consume_signatures_record:
    input r0 as Signatures.record;
    output r0.message_one as field.private;
    output r0.message_two as field.private;
    output r0.message_three as field.private;
    output r0.message_four as field.private;
    output r0.signed_message as signature.private;
    output r0.signer_address as address.private;
