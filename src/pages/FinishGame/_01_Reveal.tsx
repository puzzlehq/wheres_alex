import { useEffect } from 'react';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import SelectedAlexLocation from '../../components/SelectedAlexLocation';
import Wager from '../../components/Wager';
import { useFinishGameStore } from './store';
import { useMsRecords } from '../../state/hooks/msRecords';
import { useGameStore } from '../../state/store';

const Reveal = () => {
  const [wager, answer] = useFinishGameStore((state) => [
    state.wager,
    state.answer,
  ]);
  const [currentGame] = useGameStore((state) => [state.currentGame])

  const { msPuzzleRecords, msGameRecords, msUtilRecords } = useMsRecords(currentGame?.gameNotification.recordData.game_multisig);

  useEffect(() => {
    if (!currentGame || !msPuzzleRecords || !msGameRecords || msUtilRecords) return;
    const challenger_answer_record = currentGame.utilRecords.find((r) => 
      r.data.owner.replace('.private', '') === currentGame.gameNotification.recordData.challenger_address
    )
    // const joint_piece_state = currentGame.
  },[currentGame?.gameNotification.recordData.game_multisig, [msPuzzleRecords, msGameRecords].toString()])

  return (
    <div className='flex h-full w-full flex-col gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <p className='font-bold'>RESULTS ARE IN</p>
        {wager && <Wager wagerAmount={wager} />}
      </div>
      <PageHeader bg='bg-primary-blue' text='WHERE IS ALEX?' />
      {answer && (
        <div className='flex flex-col gap-2'>
          <SelectedAlexLocation answer={answer} win={undefined} />
          <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
            You chose to hide Alex {answer}!
          </div>
        </div>
      )}
      <div className='flex flex-grow flex-col' />
      <Button color='green' onClick={() => {}}>
        REVEAL RESULTS
      </Button>
    </div>
  );
};

export default Reveal;
