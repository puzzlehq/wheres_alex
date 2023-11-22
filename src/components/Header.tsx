import { useDisconnect, shortenAddress, useAccount } from '@puzzlehq/sdk';
import swaggers from '../assets/swaggers.png';
import Button from './Button';
import { useAtom } from 'jotai';
import { acceptGameInputsAtom, acceptGameStepAtom } from '../pages/AcceptGame';
import { proposeGameInputsAtom, proposeGameStepAtom } from '../pages/NewGame';
import { useNavigate } from 'react-router-dom';
import { mapStepAtom } from '../App';

export const AppHeader = () => {
  const { account } = useAccount();
  const { disconnect, loading } = useDisconnect();
  const [_1, setAcceptGameInputs] = useAtom(acceptGameInputsAtom);
  const [_2, setAcceptGameStep] = useAtom(acceptGameStepAtom);
  const [_3, setProposeGameInputs] = useAtom(proposeGameInputsAtom);
  const [_4, setProposeGameStep] = useAtom(proposeGameStepAtom);
  const [_5, setMapStep] = useAtom(mapStepAtom);

  const navigate = useNavigate();

  return (
    <div className='flex w-full items-center justify-between gap-5  p-4'>
      {account?.address && (
        <>
          <img
            loading='lazy'
            src={swaggers}
            className='max-h-[100px] self-stretch overflow-hidden fill-white object-cover object-center'
            onClick={() => {
              navigate('/');
              setMapStep(false);
              setAcceptGameStep('1_AcceptGame');
              setProposeGameStep('1_NewGame');
              setAcceptGameInputs({});
              setProposeGameInputs({});
            }}
          />
          <Button
            size='md'
            variant='secondary'
            className='w-fit'
            onClick={async () => {
              disconnect().then(() => navigate('/'));
            }}
            disabled={loading}
          >
            {shortenAddress(account.address)}
          </Button>
        </>
      )}
    </div>
  );
};
