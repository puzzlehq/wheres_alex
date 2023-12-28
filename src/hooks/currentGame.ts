import { useGameStore } from '@state/gameStore';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const useInitCurrentGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { game_multisig } = useParams();

  const [yourTurn, theirTurn, currentGame, setCurrentGame] = useGameStore(
    (state) => [
      state.yourTurn,
      state.theirTurn,
      state.currentGame,
      state.setCurrentGame,
    ]
  );

  useEffect(() => {
    if (game_multisig && !currentGame) {
      const games = [...yourTurn, ...theirTurn];
      const _currentGame = games.find(
        (game) =>
          game.gameNotification.recordData.game_multisig === game_multisig
      );
      _currentGame && setCurrentGame(_currentGame);
    } else if (!game_multisig && location.pathname !== '/new-game') {
      navigate('/');
    }
  }, [game_multisig, currentGame, [...yourTurn, ...theirTurn].toString()]);

  console.log('current game', currentGame)
  return { currentGame };
};
