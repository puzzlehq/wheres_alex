program zksummit_token_v10.aleo {
  mapping account: address => u64;

  record ZK10 {
    owner: address,
    amount: u64,
  }

  /* Mint */
  transition mint_public(public receiver: address, public amount: u64) {
    // Only OWNER_ADDRESS can mint -- think of this as JPOWELL and Money printer priveleges
    // Removing assertion for demo at ZK Summit for iOS
    // assert_eq(self.caller, OWNER_ADDRESS);
    return then finalize(receiver, amount);
  }

  finalize mint_public(public receiver: address, public amount: u64) {
    let receiver_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
    Mapping::set(account, receiver, receiver_amount + amount);
  }

  transition mint_private(receiver: address, amount: u64) -> ZK10 {
    // Only OWNER_ADDRESS can mint -- think of this as JPOWELL and Money printer priveleges
    // Removing assertion for demo at ZK Summit for iOS
    // assert_eq(self.caller, OWNER_ADDRESS);
    return ZK10 {
      owner: receiver,
      amount: amount,
    };
  }

  /* Transfer */
  transition transfer_public(public receiver: address, public amount: u64) {
    return then finalize(self.caller, receiver, amount);
  }

  finalize transfer_public(public sender: address, public receiver: address, public amount: u64) {
    let sender_amount: u64 = Mapping::get_or_use(account, sender, 0u64);
    Mapping::set(account, sender, sender_amount - amount);

    let receiver_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
    Mapping::set(account, receiver, receiver_amount + amount);
  }

  transition transfer_private(sender: ZK10, receiver: address, amount: u64) -> (ZK10, ZK10) {
    let difference: u64 = sender.amount - amount;

    let remaining: ZK10 = ZK10 {
      owner: sender.owner,
      amount: difference,
    };

    let transferred: ZK10 = ZK10 {
      owner: receiver,
      amount: amount,
    };

    return (remaining, transferred);
  }

  transition transfer_private_to_public(sender: ZK10, public receiver: address, public amount: u64) -> ZK10 {
    let difference: u64 = sender.amount - amount;

    let remaining: ZK10 = ZK10 {
      owner: sender.owner,
      amount: difference,
    };

    return remaining then finalize(receiver, amount);
  }

  finalize transfer_private_to_public(public receiver: address, public amount: u64) {
    let receiver_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
    Mapping::set(account, receiver, receiver_amount + amount);
  }

  transition transfer_public_to_private(public receiver: address, public amount: u64) -> ZK10 {
    let transferred: ZK10 = ZK10 {
      owner: receiver,
      amount: amount,
    };

    return transferred then finalize(self.caller, amount);
  }

  finalize transfer_public_to_private(public sender: address, public amount: u64) {
    let sender_amount: u64 = Mapping::get_or_use(account, sender, 0u64);
    Mapping::set(account, sender, sender_amount - amount);
  }
}
