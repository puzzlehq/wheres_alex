import { shortenAddress } from '@puzzlehq/sdk';
import PuzzleAccount from './models/account.js';
import { useState } from 'react';
import Home from './pages/Home.js';
import NewGame from './pages/NewGame.js';
import StartWager from './pages/StartWager.js';
// import mainImg from '../src/assets/alex_behind_wall.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HideAlex from './pages/HideAlex.js';
import ConfirmStartGame from './pages/ConfirmStartGame.js';
import PendingConfirmStartGame from './pages/PendingConfirmStartGame.js';
import rightImageSrc from '../src/assets/alex_mic_left_tilt.png';
import leftImageSrc from '../src/assets/alex_mic_right_tilt.png';
import bottomImageSrc from '../src/assets/alexbottom.png';
import GameStarted from './pages/GameStarted.js';
import { useConnect } from '@puzzlehq/sdk';

function Welcome({ onConnectWallet }: { onConnectWallet: () => void }) {
  const { connect, isConnected, loading } = useConnect();

  return (
    <div className="h-screen flex w-full justify-between items-stretch">
      <div className="relative flex w-full flex-col justify-center items-center h-full">

        <img src={rightImageSrc} alt="Right top decoration" className="absolute top-0 right-0 h-full max-w-[50%] max-h-[18rem] object-contain z-0" />

        <img src={leftImageSrc} alt="Left decoration" className="absolute top-1/4 left-0 h-full max-w-[80%] max-h-[20rem] object-contain transform -translate-x-1/4 -translate-y-20 w-3/5 z-0" />

        <h1 className="z-5 text-white text-center text-24xl font-extrabold leading-[40.56px] tracking-tight whitespace-nowrap max-w-full overflow-visible">
            WHERE <br /> IS ALEX?{" "}
        </h1>
        <p
          className="z-10 text-white text-center text-base font-bold tracking-tight max-w-[400px] mt-8"
        >
            A thrilling game showcasing the power of Aleo and the Puzzle multiparty privacy stack through a wager between friends!
        </p>
        <button
            onClick={connect}
            className="z-10 bg-yellow-300 flex justify-center items-center mt-7 px-5 py-8 rounded-[200px] text-black text-4xl font-extrabold w-1/2 hover:bg-yellow-400"
        >
            Play!
        </button>

        <img src={bottomImageSrc} alt="bottom decoration" className="absolute bottom-0 center h-full max-w-[35%] max-h-[12rem] object-contain transform -translate-y-100 w-3/5 z-0" />
      </div>
    </div>
  );
}


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

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const account: PuzzleAccount = {
    network: 'Aleo',
    chainId: '1',
    address: 'aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6',
    shortenedAddress: 'aleo1as..tuvr6'
  };
  console.log(account.address);

  const onConnectWallet = () => {
    setIsConnected(true);
  };

  return (
    <div className="App min-h-screen bg-yellow-500 flex justify-center">
      <div className="max-w-screen-sm w-full bg-neutral-900 shadow-md overflow-y-auto flex flex-col">

        {isConnected && account?.address && <Header isConnected={isConnected} address={account?.address} />}

        <Router>
          <div className="max-w-screen-sm w-full h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/new-game" element={<NewGame />} />
              <Route path="/start-wager" element={<StartWager />} />
              <Route path="/hide-alex" element={<HideAlex />} />
              <Route path="/confirm-start-game" element={<ConfirmStartGame account={account}/>} />
              <Route path='/game-started' element={<GameStarted />} />
              <Route path="/pending-confirm-start-game" element={<PendingConfirmStartGame />} />
              <Route
                path="/"
                element={ isConnected ? <Home /> : <Welcome onConnectWallet={onConnectWallet} /> }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;


