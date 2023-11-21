/* eslint-disable @typescript-eslint/no-explicit-any */
import { proposeGameInputsAtom, proposeGameStepAtom } from './index';
import { useAtom } from 'jotai';
import { aleoAddressRegex } from '../../state/game_states';
import { useAccount } from '@puzzlehq/sdk';
import { Banner } from '../../components/Banner';
import { useNavigate } from 'react-router-dom';

function NewGame() {
  const [inputs, setInputs] = useAtom(proposeGameInputsAtom);
  const [_, setStep] = useAtom(proposeGameStepAtom);
  const { account } = useAccount();

  const opponent = inputs.opponent;

  const navigate = useNavigate()

  return (
    <div className='flex flex-col h-full w-full justify-between items-center px-5'>
      <Banner
        title={<>Choose yer<br/>matey</>}
        body={
          <div className='w-full'>
            <input
              type='text'
              className='mt-5 w-full rounded-lg border-[3px] bg-transparent border-solid border-bg2 p-4 text-sm font-semibold leading-4 max-md:mr-px focus-visible:outline-primary'
              placeholder="Enter Opponent's Address"
              id='opponent'
              value={opponent ?? ''}
              onChange={(e) => {
                setInputs({ ...inputs, opponent: e.target.value })
              }}
            />
          </div>
        }
        onClickLeft={() => {
          navigate('/')
        }}
        onClickRight={() => setStep('2_HideTreasure')}
        rightDisabled={!aleoAddressRegex.test(inputs.opponent ?? '') || inputs.opponent === account.address}
        step={0}
        totalSteps={5}
      />
    </div>
  );
}

export default NewGame;
