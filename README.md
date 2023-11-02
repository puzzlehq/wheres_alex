# coinflip.aleo
## Functions

### propose_game

`propose_game` to create a game with a friend.

Function:
```rust
propose_game(
    private ms_seed: field,
    private game_address: address,
    private opponent: address,
    private wager: puzzle_token.leo/Puzz.record,
    private wager_amount: u64,
    private player_one_answer: field,
    private sig: signature,
    private m_of_n: u8,
    private nonce: field
)
```

Example Command:
```
leo run propose_game 12312412field aleo1eqkje8cvr0twm07w4m5n356pju7njtfx75xp5zzvpg8yhgrnr58snq9kyu aleo1muq22xpnzgaeqez0mgkdcau6kcjpk6ztey0u8yv34zcupk3hpczsmxeaww "{
  owner: aleo1ml2xr6fawppd6uaf8gn95uy2fpqqg8gk74k0lu8na7uvayk64v8qu8hw5u.private,
  amount: 1u64.private,
  _nonce: 3208710856480263791337381472273621837437204638140170253923868382800284202059group.public
}" 1u64 1field sign1qnhgv5vd5xrjvend63pgw2qj8f6zxhz5yk36r3nsxkgjz6285cp9gz332p7uyu6upujg0f4qf4cyqqamp5hh6kfg2nxhyfkk3lkrvpxlam644zwcpzuhnjsc08k76c40xc23gzdpsx8fkzgz6c02qs89q93j76sqw5svpfpe4yqtpa9g6zwsqs6y3r5pfamwk89hjveu44mqzxzltvg 1field 1u8 1field
```

### reveal_answer

`reveal_answer` to reveal answer record to prove player 1 won or lost.

Function:
```rust
reveal_answer(
    private answer_record: Answer,
    private game_address: address,
    private opponent_address: address,
)
```

Example Command:


```
leo run reveal_answer "{
  owner: aleo1ml2xr6fawppd6uaf8gn95uy2fpqqg8gk74k0lu8na7uvayk64v8qu8hw5u.private,
  game_address: aleo1eqkje8cvr0twm07w4m5n356pju7njtfx75xp5zzvpg8yhgrnr58snq9kyu.private,
  nonce: 1field.private,
  answer: 1field.private,
  _nonce: 3758214225201963159322315890422876208404622381900552146703962096804019801163group.public
}" aleo1eqkje8cvr0twm07w4m5n356pju7njtfx75xp5zzvpg8yhgrnr58snq9kyu aleo1muq22xpnzgaeqez0mgkdcau6kcjpk6ztey0u8yv34zcupk3hpczsmxeaww
```
