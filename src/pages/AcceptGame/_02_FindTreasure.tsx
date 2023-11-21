/* eslint-disable @typescript-eslint/no-explicit-any */
import ChooseTreasureLocation from '../../components/ChooseTreasureLocation';
import { acceptGameInputsAtom, acceptGameStepAtom } from './index.js';
import { useAtom } from 'jotai';
import { Answer } from '../../state/game_states';
import { Banner } from '../../components/Banner';

function FindTreasure() {
  const [acceptGameInputs, setAcceptGameInputs] = useAtom(acceptGameInputsAtom);
  const [_, setStep] = useAtom(acceptGameStepAtom);

  const answer = acceptGameInputs.player_two_answer_readable;

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        <Banner
          title={
            <>
              Find the
              <br />
              treasure
            </>
          }
          body={
            <>
              <p className='text-primary-white mb-8 mt-8 max-w-[400px] text-center text-base font-bold tracking-tight'>
                Choose where you think Pirate Leo hid his treasure. Because of
                Aleo's privacy, you won't be able to know until after you have
                submitted your guess.
              </p>
              <ChooseTreasureLocation
                setAnswer={(answer) => {
                  const newAnswer =
                    answer === Answer.left ? '0field' : '1field';
                  setAcceptGameInputs({
                    ...acceptGameInputs,
                    player_two_answer: newAnswer,
                    player_two_answer_readable: answer,
                  });
                }}
                answer={answer}
                hiding={false}
              />
            </>
          }
          onClickLeft={() => {
            setStep('1_AcceptGame');
            setAcceptGameInputs({
              ...acceptGameInputs,
              player_two_answer: undefined,
              player_two_answer_readable: undefined,
            });
          }}
          onClickRight={() => setStep('3_AboutPuzzle')}
          rightDisabled={
            acceptGameInputs.player_two_answer === undefined ||
            acceptGameInputs.player_two_answer_readable === undefined
          }
          step={1}
          totalSteps={5}
        />
      </div>
    </main>
  );
}

export default FindTreasure;
