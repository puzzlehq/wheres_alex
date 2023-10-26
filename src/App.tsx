// import { shortenAddress, useAccount, useConnect } from '@puzzlehq/sdk';
import { shortenAddress } from '@puzzlehq/sdk';
// import Dashboard from './pages/Dashboard.js';
import PuzzleAccount from './models/account.js';
import { useState } from 'react';
import Home from './pages/Home.js';

function App() {
  // const { connect, isConnected, loading } = useConnect();
  const [isConnected, SetIsConnected] = useState<boolean>(false);
  // const { account } = useAccount();
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
    <div className='w-full h-full flex justify-center items-center'>
      <Header address={account?.address} />
      <div className='w-full h-full pt-20 pb-4 items-center align-middle'>
        {/* {loading && 
          <div className='w-full h-full text-center align-middle'>
            loading...
          </div>
        }
        {!loading && isConnected && <Dashboard />} */}
        {isConnected && <Home />}
        {!isConnected && 
          <div className='w-full h-full text-center align-middle'>
            <button onClick={onConnectWallet}>Connect your wallet</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;

function Header({address}: {address: string | undefined}) {
  return (
    <div className='w-full fixed top-0 h-16 border-b flex justify-between items-center px-8 bg-[#ffffff] dark:bg-[#242424]'>
      <span className='text-3xl font-bold'>ZK Summit 10 Token</span>
      {address && <span className="text-m">
        {shortenAddress(address)}
      </span>}
    </div>
  );
}