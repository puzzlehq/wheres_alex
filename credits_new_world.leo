// keeping here if we ned it at some point
program credits_new_world.aleo {
    record credits {
        owner: address,
        microcredits: u64
    }
    transition join(a: credits, b:credits) -> credits{
        return credits {
            owner: a.owner,
            microcredits: a.microcredits + b.microcredits
        };
    }

    transition split(a: credits, amount: u64) -> (credits, credits) {
        let b: credits = credits {
            owner: a.owner,
            microcredits: amount
        };
        let c: credits = credits{
            owner: a.owner,
            microcredits: a.microcredits - amount
        };
        return (b, c);
    }

    transition transfer_private(a: credits, receiver: address, amount: u64) -> (credits, credits) {
        let b: credits = credits{
            owner: receiver,
            microcredits: amount
        };
        let c: credits = credits{
            owner: a.owner,
            microcredits: a.microcredits - amount
        };
        return (b, c);
    }

    // The `transfer_public_to_private` function turns a specified amount
    // from the mapping `account` into a record for the specified receiver.
    //
    // This function preserves privacy for the receiver's record, however
    // it publicly reveals the sender and the specified amount.
    transition transfer_public_to_private(public to: address, public amount: u64) -> (credits) {
        return credits {
            owner: to, microcredits: amount
        };
    }

    // The `transfer_private_to_public` function turns a specified amount
    // from a record into public credits for the specified receiver.
    //
    // This function preserves privacy for the sender's record, however
    // it publicly reveals the receiver and the amount.
    transition transfer_private_to_public(private input: credits, public to: address, public amount: u64) -> (credits) {
        return input;
    }

}