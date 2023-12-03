import Home from './pages/Home.js';
import NewGame from './pages/NewGame/index.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/Header.js';
import { Welcome } from './pages/Welcome.js';
import { useAccount } from '@puzzlehq/sdk';
import AcceptGame from './pages/AcceptGame/index.js';
import { LoseRoute } from './pages/FinishGame/Lose/index.js';
import WinRoute from './pages/FinishGame/Win/index.js';
import RenegeGame from './pages/Renege/_01_Renege.js';
import Reveal from './pages/RevealAnswer/_01_Reveal.js';
import { useInitGame } from './hooks/initGame.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const { account } = useAccount();
  const queryClient = new QueryClient();

  useInitGame();

  return (
    <div className='App flex min-h-screen justify-center bg-neutral-900'>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className='flex w-full max-w-screen-sm flex-col overflow-y-auto shadow-md'>
            {account && account?.address && <AppHeader />}
            <div className='h-full w-full max-w-screen-sm p-4'>
              <Routes>
                <Route index element={account ? <Home /> : <Welcome />} />
                <Route path='/new-game' element={<NewGame />} />
                <Route path='/renege-game' element={<RenegeGame />} />
                <Route path='/accept-game' element={<AcceptGame />} />
                <Route path='/finish-game' element={<Reveal />} />
                <Route path='/claim-prize'>
                  <Route path='win' element={<WinRoute />} />
                  <Route path='lose' element={<LoseRoute />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
