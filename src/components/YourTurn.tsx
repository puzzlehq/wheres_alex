import { useNavigate } from 'react-router-dom';
import { useClaimPrizeWinStore } from '../pages/ClaimPrize/Win/store.js';
import { useFinishGameStore } from '../pages/FinishGame/store.js';
import Button from './Button.js';
import { Answer } from '../state/RecordTypes/wheres_alex_vxxx.js';
import { Game, useGameStore } from '../state/store.js';
import { shortenAddress } from '@puzzlehq/sdk';
import {
  AcceptGameButton,
  SubmitWagerButton,
} from '../pages/AcceptGame/index.js';

function YourTurnItem({ game }: { game: Game }) {
  const multisig = game.gameNotification.recordData.game_multisig;
  const opponent = game.gameNotification.recordData.opponent_address;
  const wager = game.gameNotification.recordData.total_pot / 2;

  const navigate = useNavigate();

  const [setCurrentGame] = useGameStore((state) => [state.setCurrentGame]);

  const [initializeFinishGame] = useFinishGameStore((state) => [
    state.initialize,
  ]);

  const [initializeClaimWin] = useClaimPrizeWinStore((state) => [
    state.initialize,
  ]);

  console.log(game)

  const renderActionButton = () => {
    switch (game.gameAction) {
      case 'Submit Wager':
        return <SubmitWagerButton game={game} />;
      case 'Accept':
        return <AcceptGameButton game={game} />;
      case 'Reveal':
        return (
          <Button
            onClick={() => {
              initializeFinishGame(opponent, Number(wager), Answer.InTheWeeds);
              setCurrentGame(game);
              navigate('/finish-game');
            }}
            size='sm'
            color='yellow'
          >
            Reveal
          </Button>
        );
      case 'Claim':
        return (
          <Button
            onClick={() => {
              initializeClaimWin(opponent, Number(wager), Answer.InTheWeeds);
              setCurrentGame(game);
              navigate('/claim-prize/win');
            }}
            color='yellow'
            size='sm'
          >
            Claim
          </Button>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {shortenAddress(opponent)}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {wager} pieces
      </div>
      <div className='flex justify-end'>{renderActionButton()}</div>
    </div>
  );
}

function YourTurn({ games }: { games: Game[] }) {
  return (
    <section className='flex grow flex-col border-2 border-solid border-primary-pink pb-6'>
      <div className='flex max-w-full flex-col self-start bg-primary-pink px-5 py-2'>
        <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 text-neutral-900'>
          YOUR TURN
        </div>
      </div>
      <div className='flex flex-col px-5 pt-2'>
        {games.map((game, ix) => (
          <YourTurnItem key={ix} game={game} />
        ))}
      </div>
    </section>
  );
}

export default YourTurn;
