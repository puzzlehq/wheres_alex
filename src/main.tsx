import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { PuzzleWalletProvider, PuzzleWeb3Modal } from '@puzzlehq/sdk';
import initWasm, { init_panic_hook } from '@puzzlehq/aleo-wasm-web';

(async () => {
  await initWasm('../node_modules/@puzzlehq/aleo-wasm-web/aleo_wasm_bg.wasm');
  init_panic_hook();
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
})();
