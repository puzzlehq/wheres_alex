import { useNavigate } from 'react-router-dom';
import GameState, { Answer } from '../state/game_states';
import { useClaimPrizeLoseStore } from '../pages/ClaimPrize/Lose/store';
import { useClaimPrizeWinStore } from '../pages/ClaimPrize/Win/store';
import { useFinishGameStore } from '../pages/FinishGame/store';
import Button from './Button';
import { useAtom } from 'jotai';
import { acceptGameInputsAtom } from '../pages/AcceptGame';

function NotificationItem({ notification }: { notification: GameState }) {
  const action = notification.action;
  const multisig = notification.gameMultisig;
  const opponent = notification.player;
  const wager = notification.wager;

  const navigate = useNavigate();

  const [_1, initializeAcceptGame] = useAtom(acceptGameInputsAtom);
  const [initializeFinishGame] = useFinishGameStore((state) => [
    state.initialize,
  ]);
  const [initializeClaimLose] = useClaimPrizeLoseStore((state) => [
    state.initialize,
  ]);
  const [initializeClaimWin] = useClaimPrizeWinStore((state) => [
    state.initialize,
  ]);

  const renderActionButton = () => {
    switch (action) {
      case 'Start':
        return (
          <Button
            onClick={() => {
              // initializeAcceptGame(opponent, Number(wager), multisig);
              navigate('/accept-game');
            }}
            variant='green'
            size='md'
          >
            {action}
          </Button>
        );
      case 'Finish':
        return (
          <Button
            onClick={() => {
              initializeFinishGame(opponent, Number(wager), Answer.left);
              navigate('/finish-game');
            }}
            variant='green'
            size='md'
          >
            {action}
          </Button>
        );
      case 'Claim':
        return (
          <Button
            onClick={() => {
              if (notification.win) {
                initializeClaimWin(opponent, Number(wager), Answer.left);
                navigate('/claim-prize/win');
              } else {
                initializeClaimLose(opponent, Number(wager), Answer.right);
                navigate('/claim-prize/lose');
              }
            }}
            variant='green'
            size='md'
          >
            {action}
          </Button>
        );
      default:
        // The 'else' part for '... other buttons'
        return (
          <>
            <Button variant={action === 'Delete' ? 'red' : 'gray'} size='md'>
              {action}
            </Button>
          </>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight max-sm:ml-2'>
        {opponent}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight max-sm:ml-2'>
        {wager} pieces
      </div>
      <div className='flex justify-end'>{renderActionButton()}</div>
    </div>
  );
}

type NotificationsProps = {
  notifications: GameState[];
};

function Notifications({ notifications }: NotificationsProps) {
  return (
    <section className='flex grow flex-col rounded-t-[5px] border-2 border-solid border-bg2 bg-bg1 pb-6'>
      <div className='flex max-w-full flex-col self-start bg-bg2 px-5 py-2'>
        <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3'>
          YOUR TURN
        </div>
      </div>
      <div className='flex flex-col px-5 pt-2'>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.player}
            notification={notification}
          />
        ))}
      </div>
    </section>
  );
}

export default Notifications;
