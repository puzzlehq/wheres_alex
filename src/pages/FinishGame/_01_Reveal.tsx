import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import SelectedAlexLocation from '../../components/SelectedAlexLocation';
import Wager from '../../components/Wager';
import { useMsRecords } from '../../hooks/msRecords';
import { useGameStore } from '../../state/store';
import { useFinishGameStore } from './store';
import { Answer } from '../../state/RecordTypes/wheres_alex_vxxx';
import Opponent from '../../components/Opponent';
import { EventType, requestCreateEvent } from '@puzzlehq/sdk';
import { GAME_FUNCTIONS, GAME_PROGRAM_ID, stepFees } from '../../state/manager';

const Reveal = () => {
  const [inputs, initialize, setEventId] = useFinishGameStore((state) => [
    state.inputsRevealAnswer,
    state.initialize,
    state.setEventId,
  ]);
  const [currentGame] = useGameStore((state) => [
    state.currentGame,
    state.puzzleRecords,
  ]);

  const { msPuzzleRecords, msGameRecords } = useMsRecords(
    currentGame?.gameNotification.recordData.game_multisig
  );

  useEffect(() => {
    if (
      !currentGame ||
      !msPuzzleRecords ||
      !msGameRecords ||
      !currentGame.utilRecords
    )
      return;
    const reveal_answer_notification_record =
      currentGame.gameNotification.recordWithPlaintext;

    const challenger_answer_record = currentGame.utilRecords.find(
      (r) =>
        r.data.owner.replace('.private', '') ===
        currentGame.gameNotification.recordData.challenger_address
    );

    const joint_piece_stake = currentGame.puzzleRecords.find(
      (r) => r.data.ix.replace('.private', '') === '10u32'
    );

    const challenger_claim_signature = currentGame.puzzleRecords.find(
      (r) => r.data.ix.replace('.private', '') === '7u32'
    );

    console.log(
      'reveal_answer_notification_record',
      reveal_answer_notification_record
    );
    console.log('challenger_answer_record', challenger_answer_record);
    console.log('joint_piece_stake', joint_piece_stake);
    console.log('challenger_claim_signature', challenger_claim_signature);

    if (
      !reveal_answer_notification_record ||
      !challenger_answer_record ||
      !joint_piece_stake ||
      !challenger_claim_signature
    )
      return;

    initialize(
      reveal_answer_notification_record,
      challenger_answer_record,
      joint_piece_stake,
      challenger_claim_signature
    );
  }, [
    currentGame?.gameNotification.recordData.game_multisig,
    [
      msPuzzleRecords,
      msGameRecords,
      currentGame?.utilRecords,
      currentGame?.puzzleRecords,
    ].toString(),
  ]);
  const opponent = currentGame?.gameNotification.recordData.challenger_address;
  const wagerAmount =
    currentGame?.gameNotification.recordData.total_pot ?? 0 / 2;
  const answer =
    inputs?.challenger_answer_record?.data.answer === '0field.private'
      ? Answer.InTheWeeds
      : Answer.BehindTheBuilding;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const createEvent = async () => {
    if (
      !inputs?.reveal_answer_notification_record ||
      !inputs?.challenger_answer_record ||
      !inputs?.joint_piece_stake ||
      !inputs?.challenger_claim_signature
    )
      return;
    setLoading(true);
    setError(undefined);
    const response = await requestCreateEvent({
      type: EventType.Execute,
      programId: GAME_PROGRAM_ID,
      functionId: GAME_FUNCTIONS.reveal_answer,
      fee: stepFees.reveal_answer,
      inputs: Object.values(inputs),
    });
    if (response.error) {
      setError(response.error);
    } else if (response.eventId) {
      setEventId(response.eventId);
    }
    setLoading(false);
  };

  const disabled =
    !inputs?.reveal_answer_notification_record ||
    !inputs?.challenger_answer_record ||
    !inputs?.joint_piece_stake ||
    !inputs?.challenger_claim_signature;

  return (
    <div className='flex h-full w-full flex-col gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <PageHeader bg='bg-primary-blue' text='RESULTS ARE IN' />
      </div>
      {opponent && <Opponent opponent={opponent} />}
      {wagerAmount && <Wager wagerAmount={wagerAmount} />}
      {answer && (
        <div className='flex flex-col gap-2'>
          <SelectedAlexLocation answer={answer} win={undefined} />
          <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
            You chose to hide Alex {answer}!
          </div>
        </div>
      )}
      <div className='flex flex-grow flex-col' />
      <Button
        color='green'
        onClick={createEvent}
        disabled={disabled || loading}
      >
        REVEAL RESULTS
      </Button>
    </div>
  );
};

export default Reveal;
