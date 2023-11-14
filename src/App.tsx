import Home from './pages/Home.js';
import NewGame from './pages/NewGame/index.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/Header.js';
import { Welcome } from './components/Welcome.js';
import { useAccount, Record, getRecords, useOnSessionEvent,  } from '@puzzlehq/sdk';
import AcceptGame from './pages/AcceptGame/index.js';
import { LoseRoute } from './pages/ClaimPrize/Lose/index.js';
import WinRoute from './pages/ClaimPrize/Win/index.js';
import RenegeGame from './pages/Renege/_01_Renege.js';
import Reveal from './pages/FinishGame/_01_Reveal.js';
import { useEffect, useState } from 'react';
import { useGameStore } from './state/store.js';

function App() {
  const { account } = useAccount();
  const [gameRecords, setGameRecords] = useState<Record[] | undefined>(undefined);
  const [puzzleRecords, setPuzzleRecords] = useState<Record[] | undefined>(undefined);
  const [utilRecords, setUtilRecords] = useState<Record[] | undefined>(undefined);

  const [setRecords] = useGameStore((state) => [state.setRecords]);

  const fetchRecords = () => {
    // fetch gameRecords
    getRecords({ filter: { programId: 'wheres_alex.aleo', type: 'unspent' } }).then((response) => {
      setGameRecords(response.records ?? [])
    });
    // fetch puzzleRecords
    getRecords({ filter: { programId: 'wheres_alex.aleo', type: 'unspent' } }).then((response) => {
      setPuzzleRecords(response.records ?? []);
    });
    // fetch utilRecords
    getRecords({ filter: { programId: 'wheres_alex.aleo', type: 'unspent' } }).then((response) => {
      setUtilRecords(response.records ?? []);
    });
  }

  useOnSessionEvent(({ params }) => {
    const eventName = params.event.name;
    if (!['accountSelected', 'accountSynced'].includes(eventName)) return;
    if (!account) return;
    fetchRecords();
  });

  useEffect(() => {
    if (gameRecords !== undefined && puzzleRecords !== undefined && utilRecords !== undefined) {
      setRecords({ gameRecords, puzzleRecords, utilRecords });
    }
  }, [gameRecords, puzzleRecords, utilRecords])

  useEffect(() => {
    fetchRecords();
  }, [])

  return (
    <div className='App flex min-h-screen justify-center bg-neutral-900'>
      <div className='flex w-full max-w-screen-sm flex-col overflow-y-auto bg-neutral-900 shadow-md'>
        {account && account?.address && (
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
                element={account ? <Home /> : <Welcome />}
              />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
