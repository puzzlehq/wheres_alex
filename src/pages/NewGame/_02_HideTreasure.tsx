/* eslint-disable @typescript-eslint/no-explicit-any */
import ChooseTreasureLocation from '../../components/ChooseTreasureLocation';
import { useAtom } from 'jotai';
import { proposeGameInputsAtom, proposeGameStepAtom } from './index';
import { Answer } from '../../state/game_states';
import { Banner } from '../../components/Banner';

function HideTreasure() {
  const [inputs, setInputs] = useAtom(proposeGameInputsAtom);
  const [_, setStep] = useAtom(proposeGameStepAtom);

  return (
    <div className='flex h-full w-full flex-col items-center justify-between px-5'>
      <Banner
        title={
          <>
            Hide the
            <br />
            booty
          </>
        }
        body={
          <ChooseTreasureLocation
            setAnswer={(answer: Answer) =>
              setInputs({
                ...inputs,
                player_one_answer_readable: answer,
                player_one_answer: answer === Answer.left ? '0field' : '1field',
              })
            }
            answer={inputs.player_one_answer_readable as Answer}
            hiding={true}
          />
        }
        step={1}
        totalSteps={5}
        onClickLeft={() => {
          setStep('1_NewGame');
          setInputs({});
        }}
        onClickRight={() => {
          setStep('3_StartWager');
        }}
        rightDisabled={
          !inputs.player_one_answer || !inputs.player_one_answer_readable
        }
      />
    </div>
  );
}

export default HideTreasure;
