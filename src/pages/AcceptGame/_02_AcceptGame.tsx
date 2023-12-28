/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from '@components/PageHeader';
import Nav from '@components/Nav';
import ChooseAlexLocation from '@components/ChooseAlexLocation';
import Button from '@components/Button';
import {
  requestCreateEvent,
  EventType,
  EventStatus,
  useBalance,
  shortenAddress,
} from '@puzzlehq/sdk';
import {
  AcceptGameInputs,
  GAME_FUNCTIONS,
  GAME_PROGRAM_ID,
  transitionFees,
} from '@state/manager.js';
import { useEffect, useState } from 'react';
import { Answer } from '@state/RecordTypes/wheres_alex_vxxx.js';
import { Step, useAcceptGameStore } from './store.js';
import { useGameStore } from '@state/gameStore.js';
import { useMsRecords } from '@hooks/msRecords.js';
import { useEventHandling } from '@hooks/eventHandling.js';
import { useSearchParams } from 'react-router-dom';

function AcceptGame() {
  const [
    inputs,
    eventIdAccept,
    setInputs,
    setEventIdAccept,
    initializeAcceptGame,
    setStep,
  ] = useAcceptGameStore((state) => [
    state.inputsAcceptGame,
    state.eventIdAccept,
    state.setAcceptGameInputs,
    state.setEventIdAccept,
    state.initializeAcceptGame,
    state.setStep,
  ]);
  const [currentGame] = useGameStore((state) => [state.currentGame]);

  const msAddress = currentGame?.gameNotification.recordData.game_multisig;
  const { msPuzzleRecords, msGameRecords } = useMsRecords(msAddress);

  const { loading, error, event, setLoading, setError } = useEventHandling({
    id: eventIdAccept,
    address: msAddress,
    multisig: true,
    stepName: 'Accept Game',
    onSettled: () => setStep(Step._03_Confirmed),
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const { balances: msBalances } = useBalance({
    address: msAddress,
    multisig: true,
  });
  const msPublicBalance =
    msBalances && msBalances?.length > 0 ? msBalances[0].public : 0;

  useEffect(() => {
    if (!currentGame || !msPuzzleRecords || !msGameRecords) return;
    const piece_stake_challenger = msPuzzleRecords?.find(
      (r) =>
        r.data.ix === '3u32.private' &&
        r.data.challenger.replace('.private', '') ===
          currentGame.gameNotification.recordData.challenger_address &&
        r.data.staker.replace('.private', '') ===
          currentGame.gameNotification.recordData.challenger_address
    );
    const piece_claim_challenger = msPuzzleRecords.find(
      (r) =>
        r.data.ix === '6u32.private' &&
        r.data.challenger.replace('.private', '') ===
          currentGame.gameNotification.recordData.challenger_address &&
        r.data.claimer.replace('.private', '') ===
          currentGame.gameNotification.recordData.challenger_address
    );
    const piece_stake_opponent = msPuzzleRecords.find(
      (r) =>
        r.data.ix === '3u32.private' &&
        r.data.opponent.replace('.private', '') ===
          currentGame.gameNotification.recordData.opponent_address &&
        r.data.staker.replace('.private', '') ===
          currentGame.gameNotification.recordData.opponent_address
    );
    const piece_claim_opponent = msPuzzleRecords.find(
      (r) =>
        r.data.ix === '6u32.private' &&
        r.data.opponent.replace('.private', '') ===
          currentGame.gameNotification.recordData.opponent_address &&
        r.data.claimer.replace('.private', '') ===
          currentGame.gameNotification.recordData.opponent_address
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
      piece_stake_opponent === undefined ||
      msGameRecords[0] === undefined
    )
      return;
    initializeAcceptGame(
      msGameRecords[0],
      piece_stake_challenger,
      piece_claim_challenger,
      piece_stake_opponent,
      piece_claim_opponent
    );
  }, [
    currentGame?.gameNotification.recordData.game_multisig,
    [msPuzzleRecords, msGameRecords].toString(),
  ]);

  const createEvent = async () => {
    if (
      !inputs?.game_record ||
      !inputs?.opponent_answer ||
      !inputs.piece_stake_challenger ||
      !inputs.piece_claim_challenger ||
      !inputs.piece_stake_opponent ||
      !inputs.piece_claim_opponent
    )
      return;
    setLoading(true);
    setError(undefined);
    try {
      const response_block_ht = await fetch(
        'https://jigsaw-dev.puzzle.online/api/aleoapi/latest/height'
      );
      const block_ht = Number(await response_block_ht.json());
      const acceptGameInputs: Omit<
        AcceptGameInputs,
        'opponent_answer_readable'
      > = {
        game_record: inputs.game_record,
        opponent_answer: inputs.opponent_answer,
        piece_stake_challenger: inputs.piece_stake_challenger,
        piece_claim_challenger: inputs.piece_claim_challenger,
        piece_stake_opponent: inputs.piece_stake_opponent,
        piece_claim_opponent: inputs.piece_claim_opponent,
        block_ht: block_ht.toString() + 'u32',
      };
      const response = await requestCreateEvent({
        type: EventType.Execute,
        programId: GAME_PROGRAM_ID,
        functionId: GAME_FUNCTIONS.accept_game,
        fee: transitionFees.accept_game,
        inputs: Object.values(acceptGameInputs),
        address: inputs.game_record.owner,
      });
      if (response.error) {
        setError(response.error);
        setLoading(false);
      } else if (!response.eventId) {
        setError('No eventId found!');
        setLoading(false);
      } else {
        console.log('success', response.eventId);
        setEventIdAccept(response.eventId);
        setSearchParams({ eventIdAccept: response.eventId });
      }
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  const answer = inputs?.opponent_answer_readable;

  const disabled =
    !inputs?.game_record ||
    !inputs?.opponent_answer ||
    !inputs.piece_stake_challenger ||
    !inputs.piece_claim_challenger ||
    !inputs.piece_stake_opponent ||
    !inputs.piece_claim_opponent ||
    !answer ||
    msPublicBalance < transitionFees.accept_game + transitionFees.finish_game;

  const [buttonText, setButtonText] = useState('ACCEPT GAME');
  useEffect(() => {
    if (!loading) {
      setButtonText('ACCEPT GAME');
    } else if (event?.status === EventStatus.Creating) {
      setButtonText('CREATING EVENT...');
    } else if (event?.status === EventStatus.Pending) {
      setButtonText('EVENT PENDING...');
    }
  }, [loading, event?.status]);

  return (
    <div className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center gap-6 px-5'>
        <div className='flex w-full flex-col gap-2'>
          <Nav step={2} isChallenger={false} />
          <PageHeader bg='bg-primary-blue' text='FIND ALEX' />
        </div>
        <ChooseAlexLocation
          setAnswer={(answer) => {
            const newAnswer =
              answer === Answer.InTheWeeds ? '0field' : '1field';
            setInputs({
              ...inputs,
              opponent_answer: newAnswer,
              opponent_answer_readable: answer,
            });
          }}
          answer={answer}
          hiding={false}
        />
        <div className='flex flex-grow flex-col' />
        {error && <p>Error: {error}</p>}
        {!loading && (
          <p>Game multisig public balance: {msPublicBalance} public credits</p>
        )}
        {!loading &&
          msPublicBalance <
            transitionFees.accept_game + transitionFees.finish_game && (
            <p>
              {shortenAddress(msAddress ?? '') ?? 'Game multisig'} needs at
              least {transitionFees.accept_game + transitionFees.finish_game}{' '}
              public credits!
            </p>
          )}
        <Button
          onClick={createEvent}
          disabled={disabled || loading}
          color='green'
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default AcceptGame;
