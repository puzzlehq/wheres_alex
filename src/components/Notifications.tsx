import { useNavigate } from "react-router-dom";
import GameState, { Answer } from "../state/game_states";
import { useAcceptGameStore } from "../pages/AcceptGame/store";
import { useClaimPrizeLoseStore } from "../pages/ClaimPrize/Lose/store";
import { useClaimPrizeWinStore } from "../pages/ClaimPrize/Win/store";
import { useFinishGameStore } from "../pages/FinishGame/store";
import Button from "./Button";

function NotificationItem({ notification }: { notification: GameState }) {
  
  const action = notification.action;
  const multisig = notification.gameMultisig;
  const opponent = notification.player;
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
          <Button
            onClick={() => {
              initializeAcceptGame(opponent, Number(wager), multisig)
              navigate('/accept-game')
            }}
            color='yellow'
            size='sm'
          >
            {action}
          </Button>
        );
      case 'Finish':
        return (
          <Button
            onClick={() => {
              initializeFinishGame(opponent, Number(wager), Answer.InTheWeeds)
              navigate('/finish-game');
            }}
            size="sm"
            color='yellow'
          >
            {action}
          </Button>
        );
      case 'Claim':
        return (
          <Button
            onClick={() => {
              if (notification.win) {
                initializeClaimWin(opponent, Number(wager), Answer.InTheWeeds);
                navigate('/claim-prize/win');
              } else {
                initializeClaimLose(opponent, Number(wager), Answer.BehindTheBuilding);
                navigate('/claim-prize/lose');
              }
            }}
            color="yellow"
            size='sm'
          >
            {action}
          </Button>
        );
      default:
        // The 'else' part for '... other buttons'
        return (
          <>
            <Button
              color={action === 'Delete' ? 'gray' : 'yellow'}
              size="sm"
            >
              {action}
            </Button>
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
          YOUR TURN
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