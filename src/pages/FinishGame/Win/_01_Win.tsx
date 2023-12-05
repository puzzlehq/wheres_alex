import PageHeader from '@components/PageHeader';
import SelectedAlexLocation from '@components/SelectedAlexLocation';
import Wager from '@components/Wager';
import Button from '@components/Button';
import { useGameStore } from '@state/gameStore';
import { Answer } from '@state/RecordTypes/wheres_alex_vxxx';
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
  useEvent,
} from '@puzzlehq/sdk';

import { useMsRecords } from '@hooks/msRecords';

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

  const { event, error: _error } = useEvent({
    id: eventId,
    address: msAddress,
    multisig: true,
  });
  const eventStatus = event?.status;

  useEffect(() => {
    event && console.log('Win: event', event);
  }, [event]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const eventError = _error;
    eventError && setError(eventError);
  }, [_error]);

  useEffect(() => {
    if (eventStatus === EventStatus.Settled) {
      setStep(Step._02_GameOver);
      setLoading(false);
      setError(undefined);
    } else if (eventStatus === EventStatus.Failed) {
      setLoading(false);
      setError(event?.error);
    }
  }, [eventStatus]);

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

  if (currentGame?.gameNotification.recordData.ix !== '9u32') {
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

  const wager = currentGame?.gameNotification.recordData.total_pot ?? 0 / 2;
  const answer =
    currentGame?.gameNotification.recordData.challenger_answer === '0field'
      ? Answer.InTheWeeds
      : Answer.BehindTheBuilding;
  const user = currentGame.gameNotification.recordData.owner;
  const opponent_address =
    currentGame.gameNotification.recordData.opponent_address;
  const challenger_address =
    currentGame.gameNotification.recordData.challenger_address;
  const opponent_answer =
    currentGame.gameNotification.recordData.opponent_answer === '0field'
      ? Answer.InTheWeeds
      : Answer.BehindTheBuilding;
  const challenger_answer =
    currentGame.gameNotification.recordData.challenger_answer === '0field'
      ? Answer.InTheWeeds
      : Answer.BehindTheBuilding;
  const isChallenger = user === challenger_address;

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

  const disabled =
    !inputs?.game_record ||
    !inputs?.joint_piece_winner ||
    !inputs?.piece_joint_stake ||
    !inputs?.joint_piece_time_claim;
  msPublicBalance < transitionFees.finish_game;

  return (
    <div className='flex h-full w-full flex-col justify-center gap-4'>
      <Wager wagerAmount={wager} winnings />
      <PageHeader text="WHERE'S ALEX" bg='bg-primary-blue' />
      <div className='flex flex-col gap-2'>
        <SelectedAlexLocation answer={answer} win={true} />
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          {isChallenger
            ? `You put Alex ${challenger_answer}`
            : `${shortenAddress(
                challenger_address
              )} put Alex ${challenger_answer}`}
        </div>
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          {!isChallenger
            ? `You guessed Alex was ${opponent_answer}`
            : `${shortenAddress(
                opponent_address
              )} guessed Alex was ${opponent_answer}`}
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
