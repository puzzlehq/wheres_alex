/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { configureConnection } from '@puzzlehq/sdk';

(async () => {
  configureConnection({
    dAppName: 'Treasure Hunt',
    dAppDescription: 'A friendly wager between friends',
    dAppUrl: 'https://treasures.puzzle.online',
    dAppIconURL: 'https://i.imgur.com/TXRCKod.png',
  });
  return ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className='h-screen w-screen'>
      <App />
    </div>
  );
})();
