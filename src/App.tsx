import { shortenAddress } from '@puzzlehq/sdk';
import PuzzleAccount from './models/account.js';
import { useState } from 'react';
import Home from './pages/Home.js';
import NewGame from './pages/NewGame.js';
import StartWager from './pages/StartWager.js';
import mainImg from '../src/assets/alex_behind_wall.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HideAlex from './pages/HideAlex.js';
import ConfirmStartGame from './pages/ConfirmStartGame.js';
import PendingConfirmStartGame from './pages/PendingConfirmStartGame.js';

function App() {
  const [isConnected, SetIsConnected] = useState<boolean>(false);

  const account: PuzzleAccount = {
    network: 'Aleo',
    chainId: '1',
    address: 'aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6',
    shortenedAddress: 'aleo1as..tuvr6'
  };

  const onConnectWallet = () => { 
    SetIsConnected(true);
  };

  return (
    <div className="App min-h-screen bg-yellow-500 flex justify-center">
      <div className="max-w-screen-sm w-full bg-yellow-500 shadow-md overflow-y-auto flex flex-col">
        <Header isConnected={isConnected} address={account?.address} />
        <Router>
          <div className="max-w-screen-sm w-full h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/new-game" element={<NewGame />} /> 
              <Route path="/start-wager" element={<StartWager />} /> 
              <Route path="/hide-alex" element={<HideAlex />} />
              <Route path="/confirm-start-game" element={<ConfirmStartGame account={account}/>} />
              <Route path="/pending-confirm-start-game" element={<PendingConfirmStartGame />} /> 
              <Route 
                path="/" 
                element={ isConnected ? <Home /> : (
                  <div className="w-full flex flex-col items-center flex-grow space-y-4 mt-8">
                    <img src={mainImg} alt="Alex Behind Wall" className="w-3/5 mx-auto" />
                    <button 
                      onClick={onConnectWallet} 
                      className="px-10 py-4 bg-gray-600 text-white rounded shadow-md hover:bg-blue-700 text-xl mt-auto" 
                    >
                      Play!
                    </button>
                  </div>
                ) } 
              />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;

function Header({ isConnected, address }: { isConnected: boolean, address: string | undefined }) {
  return (
    <div className="w-full h-16 flex justify-between items-center px-8 dark:bg-orange-500">
      {isConnected && address ? (
        <>
          <span className="text-3xl font-bold">Find Alex!</span>
          <button className="px-4 py-1 bg-gray-600 text-white rounded shadow-md hover:bg-blue-700">
            {shortenAddress(address)}
          </button>
        </>
      ) : (
        <span className="text-3xl font-bold mx-auto">Find Alex!</span>
      )}
    </div>
  );
}
