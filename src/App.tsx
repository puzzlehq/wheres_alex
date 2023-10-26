import { shortenAddress, useAccount, useConnect } from '@puzzlehq/sdk';
import Dashboard from './Dashboard.js';

function App() {
  const { connect, isConnected, loading } = useConnect();
  const { account } = useAccount();

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Header address={account?.address} />
      <div className='w-full h-full pt-20 pb-4 items-center align-middle'>
        {loading && 
          <div className='w-full h-full text-center align-middle'>
            loading...
          </div>
        }
        {!loading && isConnected && <Dashboard />}
        {!loading && !isConnected && 
          <div className='w-full h-full text-center align-middle'>
            <button onClick={connect}>Connect your wallet</button>
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