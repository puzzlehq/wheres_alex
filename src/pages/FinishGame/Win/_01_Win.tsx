import PageHeader from '@components/PageHeader';
import SelectedAlexLocation from '@components/SelectedAlexLocation';
import Wager from '@components/Wager';
import Button from '@components/Button';
import { useGameStore } from '@state/gameStore';
import { getAnswer } from '@state/RecordTypes/wheres_alex_vxxx';
import {
  GAME_FUNCTIONS,
  GAME_PROGRAM_ID,
  transitionFees,
} from '@state/manager';
import { Step, useClaimPrizeWinStore } from './store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  EventStatus,
  EventType,
  requestCreateEvent,
  shortenAddress,
  useBalance,
} from '@puzzlehq/sdk';
import { useMsRecords } from '@hooks/msRecords';
import { useEventHandling } from '@hooks/eventHandling';

const Win = () => {
  const [inputs, eventId, setEventId, initialize, setStep] =
    useClaimPrizeWinStore((state) => [
      state.inputs,
      state.eventId,
      state.setEventId,
      state.initialize,
      state.setStep,
    ]);
  const [currentGame] = useGameStore((state) => [state.currentGame]);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const msAddress = currentGame?.gameNotification.recordData.game_multisig;
  const { msPuzzleRecords, msGameRecords } = useMsRecords(msAddress);
  const { loading, error, event, setLoading, setError } = useEventHandling({
    id: eventId,
    address: msAddress,
    multisig: true,
    stepName: "Win",
    onSettled: () => setStep(Step._02_GameOver),
  });

  const { balances: msBalances } = useBalance({
    address: msAddress,
    multisig: true,
  });
  const msPublicBalance =
    msBalances && msBalances?.length > 0 ? msBalances[0].public : 0;

  useEffect(() => {
    if (!currentGame || !msPuzzleRecords || !msGameRecords) return;
    const game_record = msGameRecords[0];

    const joint_piece_winner = msPuzzleRecords.find(
      (r) => r.data.ix === '12u32.private'
    );
    const piece_joint_stake = msPuzzleRecords.find(
      (r) => r.data.ix === '9u32.private'
    );
    const joint_piece_time_claim = msPuzzleRecords.find(
      (r) => r.data.ix === '8u32.private'
    );

    console.log('game_record', game_record);
    console.log('joint_piece_winner', joint_piece_winner);
    console.log('piece_joint_stake', piece_joint_stake);
    console.log('joint_piece_time_claim', joint_piece_time_claim);

    if (
      game_record === undefined ||
      joint_piece_winner === undefined ||
      piece_joint_stake === undefined ||
      joint_piece_time_claim === undefined
    )
      return;
    initialize(
      game_record,
      joint_piece_winner,
      piece_joint_stake,
      joint_piece_time_claim
    );
  }, [
    currentGame?.gameNotification.recordData.game_multisig,
    [msPuzzleRecords, msGameRecords].toString(),
  ]);

  const [buttonText, setButtonText] = useState('CLAIM WINNINGS');
  useEffect(() => {
    if (!loading) {
      setButtonText('CLAIM WINNINGS');
    } else if (event?.status === EventStatus.Creating) {
      setButtonText('CREATING EVENT...');
    } else if (event?.status === EventStatus.Pending) {
      setButtonText('EVENT PENDING...');
    }
  }, [loading, event?.status]);

  if (!currentGame || currentGame?.gameNotification.recordData.ix !== '9u32') {
    return (
      <div className='flex h-full w-full flex-col justify-center gap-4'>
        <p>oops! you aren't supposed to be here</p>
        <div className='flex flex-grow flex-col' />
        <Button onClick={() => navigate('/')} color='transparent'>
          GO HOME
        </Button>
      </div>
    );
  }

  const claim = async () => {
    if (
      !msAddress ||
      !inputs?.game_record ||
      !inputs?.joint_piece_winner ||
      !inputs?.piece_joint_stake ||
      !inputs?.joint_piece_time_claim
    )
      return;
    setLoading(true);
    setError(undefined);
    const response = await requestCreateEvent({
      type: EventType.Execute,
      programId: GAME_PROGRAM_ID,
      functionId: GAME_FUNCTIONS.finish_game,
      fee: transitionFees.finish_game,
      inputs: Object.values(inputs),
      address: msAddress,
    });
    if (response.error) {
      setError(response.error);
      setLoading(false);
    } else if (response.eventId) {
      console.log('success!', response.eventId);
      setEventId(response.eventId);
      setSearchParams({ eventId: response.eventId });
    }
  };

  const {
    total_pot,
    challenger_answer,
    owner,
    opponent_address,
    opponent_answer,
    challenger_address,
  } = currentGame.gameNotification.recordData;

  const wager = (total_pot ?? 0) / 2;
  const isChallenger = owner === challenger_address;

  const disabled =
    !inputs?.game_record ||
    !inputs?.joint_piece_winner ||
    !inputs?.piece_joint_stake ||
    !inputs?.joint_piece_time_claim;
  msPublicBalance < transitionFees.finish_game;

  return (
    <div className='flex h-full w-full flex-col justify-center gap-4'>
      <PageHeader text="WHERE'S ALEX" bg='bg-primary-blue' />
      <Wager wagerAmount={wager} winnings />
      <div className='flex flex-col gap-2'>
        <SelectedAlexLocation
          answer={getAnswer(challenger_answer)}
          win={true}
        />
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          {isChallenger
            ? `You put Alex ${getAnswer(challenger_answer)}`
            : `${shortenAddress(challenger_address)} put Alex ${getAnswer(
                challenger_answer
              )}`}
        </div>
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          {!isChallenger
            ? `You guessed Alex was ${getAnswer(opponent_answer)}`
            : `${shortenAddress(opponent_address)} guessed Alex was ${getAnswer(
                opponent_answer
              )}`}
        </div>
      </div>
      <div className='flex flex-grow flex-col' />
      {error && <p>{error}</p>}
      {!loading && (
        <p>Game multisig public balance: {msPublicBalance} public credits</p>
      )}
      {!loading && msPublicBalance < transitionFees.finish_game && (
        <p>
          {shortenAddress(msAddress ?? '') ?? 'Game multisig'} needs at least{' '}
          {transitionFees.finish_game} public credits!
        </p>
      )}
      <Button color='green' disabled={disabled || loading} onClick={claim}>
        {buttonText}
      </Button>
    </div>
  );
};

export default Win;
