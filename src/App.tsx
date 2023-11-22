import Home from './pages/Home.js';
import NewGame from './pages/NewGame/index.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/Header.js';
import { Welcome } from './pages/Welcome.js';
import {
  useAccount,
  Record,
  getRecords,
  useOnSessionEvent,
} from '@puzzlehq/sdk';
import AcceptGame from './pages/AcceptGame/index.js';
import { LoseRoute } from './pages/ClaimPrize/Lose/index.js';
import WinRoute from './pages/ClaimPrize/Win/index.js';
import RenegeGame from './pages/Renege/_01_Renege.js';
import Reveal from './pages/FinishGame/_01_Reveal.js';
import { useEffect, useState } from 'react';
import { useGameStore } from './state/store.js';
import { usePieces } from './state/usePieces.js';
import { atom } from 'jotai';
import MapImage from './components/MapImage.js';

export const mapStepAtom = atom<boolean>(false); // false for image, true for gif

function App() {
  const { account } = useAccount();
  const [gameRecords, setGameRecords] = useState<Record[] | undefined>(
    undefined
  );
  const [puzzleRecords, setPuzzleRecords] = useState<Record[] | undefined>(
    undefined
  );
  const [utilRecords, setUtilRecords] = useState<Record[] | undefined>(
    undefined
  );

  const [setRecords] = useGameStore((state) => [state.setRecords]);

  const fetchRecords = () => {
    // fetch gameRecords
    getRecords({
      filter: { programId: 'wheres_alex.aleo', type: 'unspent' },
    }).then((response) => {
      setGameRecords(response.records ?? []);
    });
    // fetch puzzleRecords
    getRecords({
      filter: { programId: 'puzzle_pieces_v007.aleo', type: 'unspent' },
    }).then((response) => {
      setPuzzleRecords(response.records ?? []);
    });
    // fetch utilRecords
    getRecords({
      filter: { programId: 'wheres_alex.aleo', type: 'unspent' },
    }).then((response) => {
      setUtilRecords(response.records ?? []);
    });
  };

  const { refetch: refetchPieces } = usePieces();

  useOnSessionEvent(({ params }) => {
    const eventName = params.event.name;
    if (!['accountSelected', 'accountSynced'].includes(eventName)) return;
    if (!account) return;
    fetchRecords();
    refetchPieces();
  });

  useEffect(() => {
    if (
      gameRecords !== undefined &&
      puzzleRecords !== undefined &&
      utilRecords !== undefined
    ) {
      setRecords({ gameRecords, puzzleRecords, utilRecords });
    }
  }, [gameRecords, puzzleRecords, utilRecords]);

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className='flex min-h-screen justify-center bg-gradient-to-b from-[#7CF7FF] to-[#0DD4FF] font-body'>
      <div className='z-10 flex w-full max-w-screen-sm flex-col overflow-y-auto'>
        <Router>
          <AppHeader />
          <div className='h-full w-full max-w-screen-sm p-4'>
            <Routes>
              <Route path='/new-game' element={<NewGame />} />
              <Route path='/accept-game' element={<AcceptGame />} />
              <Route path='/claim-prize'>
                <Route path='win' element={<WinRoute />} />
                <Route path='lose' element={<LoseRoute />} />
              </Route>
              <Route path='/renege-game' element={<RenegeGame />} />
              <Route path='/finish-game' element={<Reveal />} />
              <Route path='/home' element={<Home />} />
              <Route path='/' element={<Welcome />} />
            </Routes>
          </div>
        </Router>
      </div>
      <MapImage />
    </div>
  );
}

export default App;
