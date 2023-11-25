/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { configureConnection } from '@puzzlehq/sdk';

(async () => {
  configureConnection({
    dAppName: "Where's Alex?",
    dAppDescription: 'A friendly wager between friends',
    dAppUrl: 'https://wheresalex.puzzle.online',
    dAppIconURL: 'https://wheresalex.puzzle.online/alex_head.png',
  });
  return ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className='h-screen w-screen'>
      <App />
    </div>
  );
})();
