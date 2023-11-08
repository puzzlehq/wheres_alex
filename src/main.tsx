import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { PuzzleWalletProvider, PuzzleWeb3Modal } from '@puzzlehq/sdk';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='h-screen w-screen'>
    <PuzzleWalletProvider>
      <App />
    </PuzzleWalletProvider>
    <PuzzleWeb3Modal
      dAppName='Build-A-Token'
      dAppDescription='Create and manage your own custom token.'
      dAppUrl='https://zksummit10.vercel.app'
      dAppIconURL='https://link.to/assets/your_logo.png'
    />
  </div>
);
