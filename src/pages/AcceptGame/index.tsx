import SubmitWager from './_01_SubmitWager';
import AcceptGamePage from './_02_AcceptGame';
import Confirmed from './_03_Confirmed';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Step, useAcceptGameStore } from './store';
import { Game, useGameStore } from '@state/gameStore';
import Button from '@components/Button';
import { useEffect } from 'react';

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
        navigate(`/accept-game/${game.gameNotification.recordData.game_multisig}`);
      }}
      color='yellow'
      size='sm'
      disabled={puzzleRecord === undefined}
    >
      Accept 1
    </Button>
  );
};

export const AcceptGameButton = ({ game }: { game: Game }) => {
  const [setCurrentGame] = useGameStore((state) => [state.setCurrentGame]);
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        setCurrentGame(game);
        navigate(`/accept-game/${game.gameNotification.recordData.game_multisig}`);
      }}
      color='yellow'
      size='sm'
    >
      Accept 2
    </Button>
  );
};

const AcceptGame = () => {
  const navigate = useNavigate();
  const [step, setStep, setAcceptGameInputs, setSubmitWagerInputs, setEventIdSubmit, setEventIdAccept] =
    useAcceptGameStore((state) => [
      state.step,
      state.setStep,
      state.setAcceptGameInputs,
      state.setSubmitWagerInputs,
      state.setEventIdSubmit,
      state.setEventIdAccept
    ]);

  const done = () => {
    setAcceptGameInputs({});
    setSubmitWagerInputs({});
    setStep(Step._01_SubmitWager);
    navigate('/');
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const _eventIdSubmit = searchParams.get('eventIdSubmit');
    const _eventIdAccept = searchParams.get('eventIdAccept');
    if (_eventIdSubmit) {
      setEventIdSubmit(_eventIdSubmit);
    }
    if (_eventIdAccept) {
      setEventIdAccept(_eventIdAccept);
    }
  }, [searchParams])

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_SubmitWager && <SubmitWager />}
      {step === Step._02_AcceptGame && <AcceptGamePage />}
      {step === Step._03_Confirmed && <Confirmed done={done} />}
    </div>
  );
};

export default AcceptGame;
