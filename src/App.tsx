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
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const account: PuzzleAccount = {
    network: 'Aleo',
    chainId: '1',
    address: 'aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6',
    shortenedAddress: 'aleo1as..tuvr6'
  };

  const onConnectWallet = () => { 
    setIsConnected(true);
  };

  return (
    <div className="App min-h-screen bg-yellow-500 flex justify-center">
      <div className="max-w-screen-sm w-full bg-yellow-500 shadow-md overflow-y-auto flex flex-col">
        
        {isConnected && account?.address && <Header isConnected={isConnected} address={account?.address} />}
        
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
    <div className="flex w-full items-stretch justify-between gap-5 bg-black p-4">
      {isConnected && address ? (
        <>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd84c866-46d9-4d71-af0b-2055777b3fcb?"
            className="aspect-[2.95] object-cover object-center w-[161px] fill-white overflow-hidden self-stretch max-w-full"
          />
          <button className="border-[color:var(--White,#FCFCFC)] self-stretch flex w-[155px] max-w-full flex-col px-5 py-4 rounded-[200px] border-2 border-solid justify-center items-center hover:bg-white text-zinc-50 text-center text-xs font-bold whitespace-nowrap">
            {shortenAddress(address)}
          </button>
        </>
      ) : (
        <div className="self-stretch w-full"></div>
      )}
    </div>
  );
}


