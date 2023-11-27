import { useNavigate } from 'react-router-dom';
import { useAcceptGameStore } from '../pages/AcceptGame/store.js';
import { useClaimPrizeWinStore } from '../pages/ClaimPrize/Win/store.js';
import { useFinishGameStore } from '../pages/FinishGame/store.js';
import Button from './Button.js';
import { Answer } from '../state/RecordTypes/wheres_alex_vxxx.js';
import { Game, useGameStore } from '../state/store.js';
import { shortenAddress } from '@puzzlehq/sdk';
import { useMsRecords } from '../state/hooks/msRecords.js';

function YourTurnItem({ game }: { game: Game }) {
  const multisig = game.gameRecord.recordData.game_multisig;
  const opponent = game.gameRecord.recordData.opponent_address;
  const wager = game.gameRecord.recordData.total_pot;

  const navigate = useNavigate();

  const [setCurrentGame] = useGameStore((state) => [state.setCurrentGame]);

  const [initializeAcceptGame, initializeSubmitWager] = useAcceptGameStore((state) => [
    state.initializeAcceptGame, state.initializeSubmitWager
  ]);
  const [initializeFinishGame] = useFinishGameStore((state) => [
    state.initialize,
  ]);

  const [initializeClaimWin] = useClaimPrizeWinStore((state) => [
    state.initialize,
  ]);

  const [largestPiece, availableBalance] = useGameStore((state) => [state.largestPiece, state.availableBalance]);
  const puzzleRecord = availableBalance >= game.gameRecord.recordData.total_pot / 2 ? largestPiece : undefined;

  const { msPuzzleRecords, msGameRecords, msUtilRecords } = useMsRecords(game.gameRecord.recordData.game_multisig);
  
  const renderActionButton = () => {
    switch (game.gameAction) {
      case 'Submit Wager':
        return (
          <Button
            onClick={() => {
              const key_record = game.utilRecords[0];
              const game_req_notification = game.gameRecord.recordWithPlaintext;
              if (!puzzleRecord || !key_record || !game_req_notification) return;
              initializeSubmitWager(puzzleRecord, key_record, game_req_notification);
              setCurrentGame(game);
              navigate('/accept-game');
            }}
            color='yellow'
            size='sm'
            disabled={puzzleRecord === undefined}
          >
            Accept
          </Button>
        );
      case 'Accept':
        return (
          <Button
            onClick={() => {
              if (msGameRecords?.length !== 1) return;
              const playerOneClaimRecord = msPuzzleRecords?.find((r) => r.data.ix === '6u32.private' && r.data.challenger.replace('.private', '') === game.gameRecord.recordData.challenger_address)
              const playerTwoClaimRecord = msPuzzleRecords?.find((r) => r.data.ix === '6u32.private' && r.data.challenger.replace('.private', '')  === game.gameRecord.recordData.opponent_address)
              const puzz_piece_stake_one = msPuzzleRecords?.find((r) => r.data.ix === '3u32.private' && r.data.challenger.replace('.private', '')  === game.gameRecord.recordData.challenger_address)
              const puzz_piece_stake_two = msPuzzleRecords?.find((r) => r.data.ix === '3u32.private' && r.data.challenger.replace('.private', '')  === game.gameRecord.recordData.opponent_address)
              console.log('msGameRecords[0]', msGameRecords[0])
              console.log('playerOneClaimRecord', playerOneClaimRecord)
              console.log('playerTwoClaimRecord', playerTwoClaimRecord)
              console.log('puzz_piece_stake_one', puzz_piece_stake_one)
              console.log('puzz_piece_stake_two', puzz_piece_stake_two)
              if ([playerOneClaimRecord, playerTwoClaimRecord, puzz_piece_stake_one, puzz_piece_stake_two].includes(undefined)) return;
              initializeAcceptGame(msGameRecords[0], playerOneClaimRecord, playerTwoClaimRecord, puzz_piece_stake_one, puzz_piece_stake_two);
              setCurrentGame(game);
              navigate('/accept-game');
            }}
            color='yellow'
            size='sm'
          >
            Accept
          </Button>
        );
      case 'Reveal':
        return (
          <Button
            onClick={() => {
              initializeFinishGame(opponent, Number(wager), Answer.InTheWeeds);
              setCurrentGame(game);
              navigate('/finish-game');
            }}
            size='sm'
            color='yellow'
          >
            Reveal
          </Button>
        );
      case 'Claim':
        return (
          <Button
            onClick={() => {
              initializeClaimWin(opponent, Number(wager), Answer.InTheWeeds);
              setCurrentGame(game);
              navigate('/claim-prize/win');
            }}
            color='yellow'
            size='sm'
          >
            Claim
          </Button>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {shortenAddress(opponent)}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {wager} pieces
      </div>
      <div className='flex justify-end'>{renderActionButton()}</div>
    </div>
  );
}

function YourTurn({ games }: {games: Game[]}) {
  return (
    <section className='flex grow flex-col border-2 border-solid border-primary-pink pb-6'>
      <div className='flex max-w-full flex-col self-start bg-primary-pink px-5 py-2'>
        <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 text-neutral-900'>
          YOUR TURN
        </div>
      </div>
      <div className='flex flex-col px-5 pt-2'>
        {games.map((game, ix) => (
          <YourTurnItem
            key={ix}
            game={game}
          />
        ))}
      </div>
    </section>
  );
}

export default YourTurn;
