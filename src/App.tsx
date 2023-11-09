import Home from './pages/Home.js';
import NewGame from './pages/NewGame/index.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/Header.js';
import { Welcome } from './components/Welcome.js';
import { useAccount, useConnect } from '@puzzlehq/sdk';
import AcceptGame from './pages/AcceptGame/index.js';
import { LoseRoute } from './pages/ClaimPrize/Lose/index.js';
import WinRoute from './pages/ClaimPrize/Win/index.js';
import RenegeGame from './pages/Renege/_01_Renege.js';
import Reveal from './pages/FinishGame/_01_Reveal.js';

function App() {
  const { isConnected, loading } = useConnect();
  const { account } = useAccount();

  return (
    <div className='App flex min-h-screen justify-center bg-amber-400'>
      <div className='flex w-full max-w-screen-sm flex-col overflow-y-auto bg-neutral-900 shadow-md'>
        {isConnected && account?.address && (
          <AppHeader />
        )}

        <Router>
          <div className='h-full w-full max-w-screen-sm p-4'>
            <Routes>
              <Route path='/new-game' element={<NewGame />} />
              <Route path='/accept-game' element={<AcceptGame/>}/>
              <Route path='/claim-prize'>
                <Route path='win' element={<WinRoute/>}/>
                <Route path='lose' element={<LoseRoute/>}/>
              </Route>
              <Route path='/renege-game' element={<RenegeGame/>} />
              <Route path='/finish-game' element={<Reveal/>} />
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
