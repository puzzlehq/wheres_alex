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
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="max-w-screen-sm w-full h-screen bg-white shadow-md overflow-y-auto">
        <Header address={account?.address} />
        <div className="w-full h-full pt-20 pb-4 flex flex-col justify-center items-center">
          {isConnected ? <Home /> : (
            <div className="text-center">
              <button 
                onClick={onConnectWallet} 
                className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
              >
                Connect your wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

function Header({address}: {address: string | undefined}) {
  return (
    <div className="w-full h-16 border-b flex justify-between items-center px-8 bg-white dark:bg-gray-800">
      <span className="text-3xl font-bold">ZK Summit 10 Token</span>
      {address && <span className="text-lg">
        {shortenAddress(address)}
      </span>}
    </div>
  );
}
