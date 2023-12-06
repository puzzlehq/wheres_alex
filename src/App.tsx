import Home from './pages/Home.js';
import NewGame from './pages/NewGame/index.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { AppHeader } from '@components/Header.js';
import { Welcome } from './pages/Welcome.js';
import { useAccount, useOnSessionDelete } from '@puzzlehq/sdk';
import AcceptGame from './pages/AcceptGame/index.js';
import { LoseRoute } from './pages/FinishGame/Lose/index.js';
import WinRoute from './pages/FinishGame/Win/index.js';
import RenegeGame from './pages/Renege/_01_Renege.js';
import { useInitGame } from './hooks/initGame.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RevealAnswer from './pages/RevealAnswer/index.js';

const Rerouter = () => {
  const navigate = useNavigate();

  useOnSessionDelete(() => {
    navigate('/');
  });

  return <></>;
};

function App() {
  const { account } = useAccount();
  const queryClient = new QueryClient();

  useInitGame();

  return (
    <div className='App flex min-h-screen justify-center bg-neutral-900'>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Rerouter />
          <div className='flex w-full max-w-screen-sm flex-col overflow-y-auto shadow-md'>
            {account && account?.address && <AppHeader />}
            <div className='h-full w-full max-w-screen-sm p-4'>
              <Routes>
                <Route index element={account ? <Home /> : <Welcome />} />
                <Route path='/new-game' element={<NewGame />} />
                <Route
                  path='/renege-game/:game_multisig'
                  element={<RenegeGame />}
                />
                <Route
                  path='/accept-game/:game_multisig'
                  element={<AcceptGame />}
                />
                <Route
                  path='/reveal-answer/:game_multisig'
                  element={<RevealAnswer />}
                />
                <Route path='/finish-game'>
                  <Route path='win/:game_multisig' element={<WinRoute />} />
                  <Route path='lose/:game_multisig' element={<LoseRoute />} />
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
