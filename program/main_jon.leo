import cflip_testing_123_token.leo;
import puzz_testing_acct_123.leo;

// todo: wait we're going to use alice's credits to send to multisig? need to add credits.leo but not supported yet per https://github.com/AleoHQ/leo/pull/2881
// todo: ownerrules lock on game state? next turn: address on game_record work?
// todo: are imports deployed separately to separate addresses? yes looks like it -> https://t.me/c/1766615939/3581
// todo: how do we transfer puzz into game at the beginning? don't have bobs address and is_claimable false

// The 'coinflip' program.
program cflip_gm_aleo_testing_123.aleo {

    // record PlayerOneClaim {}

    // record PlayerTwoClaim {}

    // record Claim {
    //     private owner: address,
    //     private amount: u64,
    // }

    record NotifyRevealedAnswer {
        private owner: address,
        private answer: field,
        private game_address: address,
    }

    record NotifyGameOver {
        private owner: address,
        private winner: address,
        private total_pot: u64,
        private game_address: address,
    }

    record Key {
        private owner: address,
        private keys: field,
        private opponent: address,
    }

    record Answer {
        private owner: address,
        private game_address: address,
        private nonce: field,
        private answer: field,
    }

    record RevealedAnswer {
        private owner: address,
        private answer: field,
        private nonce: field,
    }

    // todo: this will likely need to store each player answer
    // todo: may be best to store players in the game here on game record
    // todo: add block height to game record?
    record Game {
        private owner: address,
        private player_one_comm: field,
        private player_two_answer: field,
        private total_pot: u64,
        private player_one_address: address,
        private player_two_address: address,
        private game_state: field,
        // private game_state: field,
        // 0 -> propose game
        // 1 -> accept game
        // 2 -> game finished
    }

    mapping puzz_supply: field => u128;
    mapping games: address => u32;


    transition mint_token (private amount: u64, private to: address) -> cflip_testing_123_token.leo/Puzz.record {
        let puzz_token: Puzz = cflip_testing_123_token.leo/mint(amount, to);
        return puzz_token;
    }

    // todo: do we want to limit this fn call only to users or will we allow contracts to call?
    // todo: do we need to pass credits as input?
    // player one proposes game
    // outputs
    // -> Answer record to player 1, to later reveal answer
    // -> Claim record to player 1, to claim record if decides to pull back proposal before game is accepted
    // -> Key record to player 2 to be able to reconstruct the game/multisig address
    // -> OwnerRules record to the game/multisig address
    // -> Game record to the game/multisig address
    // -> PuzzRecord to the game/multisig address
    // -> PuzzRecord to player 1 of any change from the wager credit

    // todo: tweak messages here
    // called by p1 key
    transition propose_game
    (
        private ms_seed: field, // from createSharedState
        private game_address: address, // from seed from createSharedState
        private opponent: address, // from user
        private wager: cflip_testing_123_token.leo/Puzz.record, // 
        private wager_amount: u64,
        private player_one_answer: field,
        private nonce: field,
    ) -> (Answer, Key, Game, puzz_testing_acct_123.leo/OwnerRules.record, cflip_testing_123_token.leo/TokenOwnerRules.record, cflip_testing_123_token.leo/PuzzClaim.record, cflip_testing_123_token.leo/Puzz.record, cflip_testing_123_token.leo/Puzz.record)

    // todo: how do we check bob is wagering the correct amount before wager submission
    // called by player 2 key
    transition submit_wager (
        private game_address: address,
        private opponent: address,
        private wager: cflip_testing_123_token.leo/Puzz.record,
        private wager_amount: u64,
    ) -> (cflip_testing_123_token.leo/TokenOwnerRules.record, cflip_testing_123_token.leo/Puzz.record, cflip_testing_123_token.leo/Puzz.record) {

    // called by ms key
    transition accept_game (
        private game_record: Game,
        private player_one_claim_record: puzz_testing_acct_123.leo/Claim.record,
        private player_two_claim_record: puzz_testing_acct_123.leo/Claim.record,
        private puzz_piece_stake: puzz_testing_acct_123.leo/PuzzPeice.record,
        private puzz_piece_stake: puzz_testing_acct_123.leo/PuzzPeice.record,
        // todo: do we need puzz record here/what for? since puzz record is already transferred to ms
        // private puzz_record: cflip_testing_123_token.leo/Puzz.record,
        // private owner_rules_record: puzz_testing_acct_123.leo/OwnerRules.record,
        private player_two_answer: field,
        // private player_two_signature: signature,
        // todo: adjust msg type here
        // private leo_message: field,
    ) -> (Game)

    // called by p1 key
    transition reveal_answer (
        private answer_record: Answer,
        private game_address: address, // ms address
        private opponent_address: address,
    ) -> (RevealedAnswer, NotifyRevealedAnswer, NotifyRevealedAnswer)

    // called by ms key
    transition finish_game (
        private game_record: Game,
        private revealed_answer_record: RevealedAnswer,
        private puzz_piece_state_record: cflip_testing_123_token.leo/Puzz.record,
        private puzz_piece_time_record: cflip_testing_123_token.leo/Puzz.record,
        private puzz_piece_joint_stake_record: cflip_testing_123_token.leo/PuzzClaim.record,
    ) -> (NotifyGameOver, NotifyGameOver)
}