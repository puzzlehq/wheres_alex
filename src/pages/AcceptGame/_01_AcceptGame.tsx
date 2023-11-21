import { useNavigate } from 'react-router-dom';
import treasure_open_full from '../../assets/treasure_open_full.png';
import treasure_open_empty from '../../assets/treasure_open_empty.png';
import { useAtom } from 'jotai';
import { acceptGameStepAtom } from './index.js';
import { Banner } from '../../components/Banner.js';

const AcceptGame = () => {
  const [_, setAcceptGameStep] = useAtom(acceptGameStepAtom);
  const navigate = useNavigate();

  return (
    <main className='h-full w-full items-stretch justify-between'>
      <div className='align-items-center flex w-full flex-col justify-center gap-2'>
        <div className='flex w-full flex-col justify-center'>
          <div className='flex w-full justify-center gap-4'>
            <img
              src={treasure_open_empty}
              className='w-1/3'
              alt={'empty treasure'}
            />
            <img
              src={treasure_open_full}
              className='w-1/3'
              alt={'full treasure'}
            />
          </div>
        </div>
        <Banner
          title={
            <>
              Hidden on
              <br />
              Aleo
            </>
          }
          body={
            <p className='text-primary-white mb-8 mt-8 max-w-[400px] text-center text-base font-bold tracking-tight'>
              Pirate Leo the Lion hid the location of his Puzzle Piece treasure
              on Aleo. This is only possible because Aleo is the first
              blockchain to have private data onchain using zero-knowledge
              proofs.
            </p>
          }
          onClickLeft={() => {
            navigate('/');
          }}
          onClickRight={() => setAcceptGameStep('2_FindTreasure')}
          step={0}
          totalSteps={5}
        />
      </div>
    </main>
  );
};

export default AcceptGame;
