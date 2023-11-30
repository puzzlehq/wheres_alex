import SubmitWager from './_01_SubmitWager';
import AcceptGamePage from './_02_AcceptGame';
import Confirmed from './_03_Confirmed';
import { useNavigate } from 'react-router-dom';
import { Step, useAcceptGameStore } from './store';
import { Game, useGameStore } from '../../state/store';
import Button from '../../components/Button';

export const SubmitWagerButton = ({ game }: { game: Game }) => {
  const [initializeSubmitWager] = useAcceptGameStore((state) => [
    state.initializeSubmitWager,
  ]);
  const [setCurrentGame] = useGameStore((state) => [state.setCurrentGame]);
  const navigate = useNavigate();

  const [largestPiece, availableBalance] = useGameStore((state) => [
    state.largestPiece,
    state.availableBalance,
  ]);
  const puzzleRecord =
    availableBalance >= game.gameNotification.recordData.total_pot / 2
      ? largestPiece
      : undefined;

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
  );
};

export const AcceptGameButton = ({ game }: { game: Game }) => {
  const [initializeAcceptGame] = useAcceptGameStore((state) => [
    state.initializeAcceptGame,
  ]);
  const [currentGame, setCurrentGame] = useGameStore((state) => [
    state.currentGame,
    state.setCurrentGame,
  ]);
  const navigate = useNavigate();

  const msGameRecords = currentGame?.msRecords?.gameRecords;
  const msPuzzleRecords = currentGame?.msRecords?.puzzleRecords;

  console.log('currentGame', currentGame);

  return (
    <Button
      onClick={() => {
        setCurrentGame(game);
        if (msGameRecords?.length !== 1) return;
        const piece_stake_challenger = msPuzzleRecords?.find(
          (r) =>
            r.data.ix === '3u32.private' &&
            r.data.challenger.replace('.private', '') ===
              game.gameNotification.recordData.challenger_address
        );
        const piece_claim_challenger = msPuzzleRecords?.find(
          (r) =>
            r.data.ix === '6u32.private' &&
            r.data.challenger.replace('.private', '') ===
              game.gameNotification.recordData.challenger_address
        );
        const piece_stake_opponent = msPuzzleRecords?.find(
          (r) =>
            r.data.ix === '3u32.private' &&
            r.data.opponent.replace('.private', '') ===
              game.gameNotification.recordData.opponent_address
        );
        const piece_claim_opponent = msPuzzleRecords?.find(
          (r) =>
            r.data.ix === '6u32.private' &&
            r.data.opponent.replace('.private', '') ===
              game.gameNotification.recordData.opponent_address
        );

        console.log('msGameRecords[0]', msGameRecords[0]);
        console.log('piece_stake_challenger', piece_stake_challenger);
        console.log('piece_claim_challenger', piece_claim_challenger);
        console.log('piece_stake_opponent', piece_stake_opponent);
        console.log('piece_claim_opponent', piece_claim_opponent);
        if (
          piece_claim_challenger === undefined ||
          piece_claim_opponent === undefined ||
          piece_stake_challenger === undefined ||
          piece_stake_opponent === undefined
        )
          return;
        initializeAcceptGame(
          msGameRecords[0],
          piece_stake_challenger,
          piece_claim_challenger,
          piece_stake_opponent,
          piece_claim_opponent,
          "70000u32"
        );
        setCurrentGame(game);
        navigate('/accept-game');
      }}
      color='yellow'
      size='sm'
    >
      Accept
    </Button>
  );
};

const AcceptGame = () => {
  const navigate = useNavigate();
  const [step, setStep, setAcceptGameInputs, setSubmitWagerInputs] =
    useAcceptGameStore((state) => [
      state.step,
      state.setStep,
      state.setAcceptGameInputs,
      state.setSubmitWagerInputs,
    ]);

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
