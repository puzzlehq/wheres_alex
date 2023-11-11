import Wager from '../../components/Wager';
import PageHeader from '../../components/PageHeader';
import Opponent from '../../components/Opponent';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { acceptGameInputsAtom } from './index';
import { useAtom } from 'jotai';
import { usePieces } from '../../state/usePieces';
import { useEffect } from 'react';

const AcceptGame = () => {
  const [acceptGameInputs, setAcceptGameInputs] = useAtom(acceptGameInputsAtom);
  const { largestPiece } = usePieces();
  const navigate = useNavigate();

  const opponent = acceptGameInputs.opponent ?? '';
  const wagerAmount = acceptGameInputs.wagerAmount ?? 0;
  const wagerRecord = largestPiece;

  useEffect(() => {
    setAcceptGameInputs({ ...acceptGameInputs, wagerRecord: wagerRecord?.plaintext.toString().replace(/\s+/g, '') });
  }, [largestPiece])

  return (
    <main className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text={`YOU'VE BEEN CHALLENGED!`} />
      <Opponent opponent={opponent} />
      <Wager wagerAmount={wagerAmount} />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-4'>
        <Button
          color='green'
          onClick={() => {
            acceptGame();
          }}
        >
          ACCEPT WAGER
        </Button>
        <Button
          color='gray'
          onClick={() => {
            rejectGame();
            navigate('/')
          }}
        >
          REJECT
        </Button>
      </div>
    </main>
  );
};

export default AcceptGame;
