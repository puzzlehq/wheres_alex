import { useNavigate } from "react-router-dom";
import GameState from "../models/game_states";

type NotificationProps = {
  notification: GameState;
};

function NotificationItem({ notification }: NotificationProps) {
  const navigate = useNavigate();

  const handleStartClick = () => {
    // Navigate to accept-game and pass the challenger and wager as state
    navigate('/accept-game', {
      state: {
        gameMultisig: notification.gameMultisig,
        opponent: notification.player,
        amount: notification.wager,
      },
    });
  };

  const handleFinishClick = () => {
    // Navigate to accept-game and pass the challenger and wager as state
    navigate('/finish-game', {
      state: {
        gameMultisig: notification.gameMultisig,
        opponent: notification.player,
        amount: notification.wager,
        win: true,
      },
    });
  };

  const handleFinishClaimClick = () => {
    // Navigate to accept-game and pass the challenger and wager as state
    navigate('/finish-game-claim', {
      state: {
        gameMultisig: notification.gameMultisig,
        opponent: notification.player,
        amount: notification.wager,
      },
    });
  };

  const renderActionButton = () => {
    switch (notification.action) {
      case 'Start':
        return (
          <button
            onClick={handleStartClick}
            className='max-w-full self-stretch rounded-[200px] bg-primary-yellow px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:w-[78px]'
            style={{ minWidth: '100px' }}
          >
            {notification.action}
          </button>
        );
      case 'Finish':
        return (
          <button
            onClick={handleFinishClick}
            className='max-w-full self-stretch rounded-[200px] bg-primary-yellow px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:w-[78px]'
            style={{ minWidth: '100px' }}
          >
            {notification.action}
          </button>
        );
      case 'Claim':
        return (
          <button
            onClick={handleFinishClaimClick}
            className='max-w-full self-stretch rounded-[200px] bg-primary-yellow px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:w-[78px]'
            style={{ minWidth: '100px' }}
          >
            {notification.action}
          </button>
        );
      default:
        // The 'else' part for '... other buttons'
        return (
          <>
            <button
              className={`max-w-full self-stretch rounded-[200px] px-5 py-3 text-center text-xs font-extrabold text-primary-black  ${
                notification.action === 'Delete' ? 'bg-primary-gray' : 'bg-primary-yellow'
              }`}
              style={{ minWidth: '100px' }}
            >
              {notification.action}
            </button>
          </>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {notification.player}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {notification.wager}
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
            key={notification.player}
            notification={notification}
          />
        ))}
      </div>
    </section>
  );
}

export default Notifications;