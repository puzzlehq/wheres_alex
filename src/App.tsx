// import PuzzleAccount from './models/account.js';
// import { useState } from 'react';
import Home from './pages/Home.js';
import NewGame from './pages/NewGame.js';
import StartWager from './pages/StartWager.js';
// import mainImg from '../src/assets/alex_behind_wall.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HideAlex from './pages/HideAlex.js';
import ConfirmStartGame from './pages/ConfirmStartGame.js';
import PendingConfirmStartGame from './pages/PendingConfirmStartGame.js';

import GameStarted from './pages/GameStarted.js';
import { Header } from './components/Header.js';
import { Welcome } from './components/Welcome.js';
import { useAccount, useConnect } from '@puzzlehq/sdk';
import AcceptGame from './pages/AcceptGame.js';
import FinishGame from './pages/FinishGame.js';
import FinishGameClaim from './pages/FinishGameClaim.js';
import RenegUnacceptedGame from './pages/RenegUnacceptedGame.js';
import FindAlex from './pages/FindAlex.js';

function App() {
  // const [isConnected, setIsConnected] = useState<boolean>(false);
  // const { isConnected, loading } = useConnect();
  const { isConnected, loading } = useConnect();
  const { account } = useAccount();

  // const account: PuzzleAccount = {
  //   network: 'Aleo',
  //   chainId: '1',
  //   address: 'aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6',
  //   shortenedAddress: 'aleo1as..tuvr6'
  // };

  return (
    <div className='App flex min-h-screen justify-center bg-yellow-500'>
      <div className='flex w-full max-w-screen-sm flex-col overflow-y-auto bg-neutral-900 shadow-md'>
        {isConnected && account?.address && (
          <Header isConnected={isConnected} address={account?.address} />
        )}

        <Router>
          <div className='h-full w-full max-w-screen-sm p-4'>
            <Routes>
              <Route path='/new-game' element={<NewGame />} />
              <Route path='/start-wager' element={<StartWager />} />
              <Route path='/hide-alex' element={<HideAlex />} />
              <Route
                path='/confirm-start-game'
                element={<ConfirmStartGame account={account} />}
              />
              <Route path='/game-started' element={<GameStarted />} />
              <Route
                path='/pending-confirm-start-game'
                element={<PendingConfirmStartGame />}
              />
              <Route path='/accept-game' element={<AcceptGame />} />
              <Route path='/finish-game' element={<FinishGame />} />
              <Route path='/finish-game-claim' element={<FinishGameClaim />} />
              <Route
                path='/reneg-unaccepted-game'
                element={<RenegUnacceptedGame />}
              />
              <Route path='/find-alex' element={<FindAlex />} />
              <Route
                path='/'
                element={!loading && isConnected ? <Home /> : <Welcome />}
              />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
