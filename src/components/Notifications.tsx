import { useNavigate } from "react-router-dom";
import GameState from "../models/game_states";
import { useAcceptGameStore } from "../pages/AcceptGame/store";
import { useClaimPrizeLoseStore } from "../pages/ClaimPrize/Lose/store";
import { useClaimPrizeWinStore } from "../pages/ClaimPrize/Win/store";
import { useFinishGameStore } from "../pages/FinishGame/store";

function NotificationItem({ notification }: { notification: GameState }) {
  
  const action = notification.action;
  const multisig = notification.multisig;
  const opponent = notification.opponent;
  const wager = notification.wager;

  const navigate = useNavigate();

  const [initializeAcceptGame] = useAcceptGameStore((state) => [state.initialize]);
  const [initializeFinishGame] = useFinishGameStore((state) => [state.initialize]);
  const [initializeClaimLose] = useClaimPrizeLoseStore((state) => [state.initialize]);
  const [initializeClaimWin] = useClaimPrizeWinStore((state) => [state.initialize]);

  const renderActionButton = () => {
    switch (action) {
      case 'Start':
        return (
          <button
            onClick={() => {
              initializeAcceptGame(opponent, wager, multisig)
              navigate('/accept-game')
            }}
            className='max-w-full self-stretch rounded-[200px] bg-primary-yellow px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:w-[78px]'
            style={{ minWidth: '100px' }}
          >
            {action}
          </button>
        );
      case 'Finish':
        return (
          <button
            onClick={() => {
              initializeFinishGame(opponent, wager, notification.answer)
              navigate('/finish-game');
            }}
            className='max-w-full self-stretch rounded-[200px] bg-primary-yellow px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:w-[78px]'
            style={{ minWidth: '100px' }}
          >
            {action}
          </button>
        );
      case 'Claim':
        return (
          <button
            onClick={() => {
              if (notification.win) {
                initializeClaimWin(opponent, wager, notification.answer);
                navigate('/claim-prize/win');
              } else {
                initializeClaimLose(opponent, wager, notification.answer);
                navigate('/claim-prize/lose');
              }
            }}
            className='max-w-full self-stretch rounded-[200px] bg-primary-yellow px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:w-[78px]'
            style={{ minWidth: '100px' }}
          >
            {action}
          </button>
        );
      default:
        // The 'else' part for '... other buttons'
        return (
          <>
            <button
              className={`max-w-full self-stretch rounded-[200px] px-5 py-3 text-center text-xs font-extrabold text-primary-black  ${
                action === 'Delete' ? 'bg-primary-gray' : 'bg-primary-yellow'
              }`}
              style={{ minWidth: '100px' }}
            >
              {action}
            </button>
          </>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {opponent}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {wager}
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
    <section className='flex grow flex-col border-2 border-solid border-primary-pink pb-6'>
      <div className='flex max-w-full flex-col self-start bg-primary-pink px-5 py-2'>
        <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 text-neutral-900'>
          NOTIFICATIONS
        </div>
      </div>
      <div className='px-5 pt-2 flex flex-col'>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.opponent}
            notification={notification}
          />
        ))}
      </div>
    </section>
  );
}

export default Notifications;