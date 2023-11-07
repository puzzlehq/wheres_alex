import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { PuzzleWalletProvider, PuzzleWeb3Modal } from '@puzzlehq/sdk';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='w-screen h-screen'>
    <PuzzleWalletProvider>
      <App />
    </PuzzleWalletProvider>
    <PuzzleWeb3Modal
      dAppName='Build-A-Token'
      dAppDescription='Create and manage your own custom token.'
      dAppUrl='http://localhost:5173'
      dAppIconURL='https://i.imgur.com/Vf6MDw9.png'
    />
  </div>
);
