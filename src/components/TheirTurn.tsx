import { useNavigate } from 'react-router-dom';
import { useRenegeStore } from '../pages/Renege/store';
import Button from './Button';
import { Game, useGameStore } from '../state/store';
import { shortenAddress } from '@puzzlehq/sdk';

function TheirTurnItem({ game }: {game: Game}) {
  const navigate = useNavigate(); // Hook to navigate
  const [initializeRenege] = useRenegeStore((state) => [state.initialize]);
  const [setCurrentGame] = useGameStore((state) => [state.setCurrentGame]);

  // Function to handle the ping button click
  const handlePingClick = () => {
    // You might want to replace 'ENTER_PHONE_NUMBER' with the actual number if needed
    const phoneNumber = 'ENTER_PHONE_NUMBER'; // Leave this as is if you want the user to enter the number.
    const message = `I'm betting you ${game.gameRecord.recordData.total_pot / 2} puzzle pieces that you can't find where I hid Alex! Click here to download Puzzle Wallet https://puzzle.online to play!`;
    const encodedMessage = encodeURIComponent(message);
    const smsHref = `sms:${phoneNumber}?&body=${encodedMessage}`;

    window.location.href = smsHref;
  };

  const renderActionButton = () => {
    switch (game.gameAction) {
      case 'Ping':
        // Assuming 'Claim' needs a special button not shown in this snippet
        // This is just an example
        return (
          <div className='flex gap-2'>
            <Button onClick={handlePingClick} color='pink' size='sm'>
              Ping
            </Button>
          </div>
        );
      case 'Renege': 
        return (
          <div className='flex gap-2'>
            <Button
              onClick={() => {
                initializeRenege(game.gameRecord.recordData.opponent_address, game.gameRecord.recordData.total_pot / 2);
                setCurrentGame(game);
                navigate('/renege-game');
              }}
              color='gray'
              size='sm'
            >
              Renege
            </Button>
          </div>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold text-primary-red'>
        {shortenAddress(game.gameRecord.recordData.challenger_address)}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold text-primary-red'>
        {game.gameRecord.recordData.total_pot / 2} pieces
      </div>
      <div className='flex justify-end'>{renderActionButton()}</div>
    </div>
  );
}

function TheirTurn({ games }: {games: Game[]}) {
  return (
    <section className='flex grow flex-col self-stretch border-2 border-solid border-primary-red pb-6'>
      <div className='flex max-w-full flex-col self-start bg-primary-red px-5 py-2'>
        <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 text-neutral-900'>
          THEIR TURN
        </div>
      </div>
      <div className='flex flex-col px-5 pt-2'>
        {games.map((game, ix) => (
          <TheirTurnItem key={ix} game={game} />
        ))}
      </div>
    </section>
  );
}

export default TheirTurn;
