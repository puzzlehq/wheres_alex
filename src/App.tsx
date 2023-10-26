import { shortenAddress } from '@puzzlehq/sdk';
import PuzzleAccount from './models/account.js';
import { useState } from 'react';
import Home from './pages/Home.js';

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
    <div className="min-h-screen bg-yellow-500 flex justify-center items-center">
      <div className="max-w-screen-sm w-full bg-yellow-500 shadow-md overflow-y-auto">
        <Header isConnected={isConnected} address={account?.address} />
        {isConnected ? 
          <Home />
          : 
          <div className="w-full flex flex-col justify-center items-center h-[calc(100vh-4rem)]"> {/* subtracting header height */}
            <button 
              onClick={onConnectWallet} 
              className="px-10 py-4 bg-gray-600 text-white rounded shadow-md hover:bg-blue-700 text-xl"
            >
              Play!
            </button>
          </div>
        }
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
