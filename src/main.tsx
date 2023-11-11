/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { PuzzleWalletProvider, PuzzleWeb3Modal } from '@puzzlehq/sdk';
import initWasm, { init_panic_hook } from '@puzzlehq/aleo-wasm-web';

(async () => {
  // await initWasm('../node_modules/@puzzlehq/aleo-wasm-web/aleo_wasm_bg.wasm');
  // init_panic_hook();
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className='h-screen w-screen'>
      {/* @ts-ignore */}
      <PuzzleWalletProvider>
        <App />
      </PuzzleWalletProvider>
      <PuzzleWeb3Modal
        dAppName="Where's Alex?"
        dAppDescription='A friendly wager between friends'
        dAppUrl='https://wheresalex.puzzle.online'
        dAppIconURL='https://wheresalex.puzzle.online/alex_head.png'
      />
    </div>
  );
})();
