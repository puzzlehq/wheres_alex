import SubmitWager from './_01_SubmitWager';
import AcceptGamePage from './_02_AcceptGame';
import Confirmed from './_03_Confirmed';
import { useNavigate } from 'react-router-dom';
import { Step, useAcceptGameStore } from './store';
import { Game, useGameStore } from '../../state/store';
import Button from '../../components/Button';
import { useMsRecords } from '../../state/hooks/msRecords';

export const SubmitWagerButton = ({game}: {game: Game}) => {
  const [initializeSubmitWager] = useAcceptGameStore((state) => [
    state.initializeSubmitWager
  ]);
  const [setCurrentGame] = useGameStore((state) => [state.setCurrentGame]);
  const navigate = useNavigate();

  const [largestPiece, availableBalance] = useGameStore((state) => [state.largestPiece, state.availableBalance]);
  const puzzleRecord = availableBalance >= game.gameNotification.recordData.total_pot / 2 ? largestPiece : undefined;

  return (
    <Button
      onClick={() => {
        const key_record = game.utilRecords[0];
        const game_req_notification = game.gameNotification.recordWithPlaintext;
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
  )
}

export const AcceptGameButton = ({game}: {game: Game}) => {
  const [initializeAcceptGame] = useAcceptGameStore((state) => [
    state.initializeAcceptGame
  ]);
  const [setCurrentGame] = useGameStore((state) => [state.setCurrentGame]);
  const navigate = useNavigate();

  const { msPuzzleRecords, msGameRecords } = useMsRecords(game.gameNotification.recordData.game_multisig);

  return (
    <Button
      onClick={() => {
        if (msGameRecords?.length !== 1) return;
        const playerOneClaimRecord = msPuzzleRecords?.find((r) => r.data.ix === '6u32.private' && r.data.challenger.replace('.private', '') === game.gameNotification.recordData.challenger_address)
        const playerTwoClaimRecord = msPuzzleRecords?.find((r) => r.data.ix === '6u32.private' && r.data.challenger.replace('.private', '')  === game.gameNotification.recordData.opponent_address)
        const puzz_piece_stake_one = msPuzzleRecords?.find((r) => r.data.ix === '3u32.private' && r.data.challenger.replace('.private', '')  === game.gameNotification.recordData.challenger_address)
        const puzz_piece_stake_two = msPuzzleRecords?.find((r) => r.data.ix === '3u32.private' && r.data.challenger.replace('.private', '')  === game.gameNotification.recordData.opponent_address)
        console.log('msGameRecords[0]', msGameRecords[0])
        console.log('playerOneClaimRecord', playerOneClaimRecord)
        console.log('playerTwoClaimRecord', playerTwoClaimRecord)
        console.log('puzz_piece_stake_one', puzz_piece_stake_one)
        console.log('puzz_piece_stake_two', puzz_piece_stake_two)
        if (playerOneClaimRecord === undefined || playerTwoClaimRecord === undefined || puzz_piece_stake_one === undefined || puzz_piece_stake_two === undefined) return;
        initializeAcceptGame(msGameRecords[0], playerOneClaimRecord, playerTwoClaimRecord, puzz_piece_stake_one, puzz_piece_stake_two);
        setCurrentGame(game);
        navigate('/accept-game');
      }}
      color='yellow'
      size='sm'
    >
      Accept
    </Button>
  )
}

const AcceptGame = () => {
  const navigate = useNavigate();
  const [step, setStep, setAcceptGameInputs, setSubmitWagerInputs] = useAcceptGameStore((state) => [state.step, state.setStep, state.setAcceptGameInputs, state.setSubmitWagerInputs])

  const done = () => {
    setAcceptGameInputs({});
    setSubmitWagerInputs({});
    setStep(Step._01_SubmitWager);
    navigate('/');
  };

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_SubmitWager && <SubmitWager />}
      {step === Step._02_AcceptGame && <AcceptGamePage />}
      {step === Step._03_Confirmed && <Confirmed done={done} />}
    </div>
  );
};

export default AcceptGame;
