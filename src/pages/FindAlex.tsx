/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, SetStateAction } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import behindBuildingImg from '../assets/behind_building.svg';
import inWeedsImg from '../assets/in_weeds.svg';

function Navigation() {
    const navigate = useNavigate();

    return (
      <nav className="justify-between items-start self-stretch flex w-full gap-5 mt-11 max-md:justify-center max-md:mr-px max-md:mt-10">
        <a href="#"
        onClick={() => navigate('/new-game')}
        className="text-white text-center text-xs font-extrabold tracking-tight self-stretch">
            1. CHALLENGE
        </a>
        <div className="text-white text-center text-xs font-extrabold tracking-tight self-stretch">
          <a href="#" className="text-white text-center text-xs font-extrabold underline tracking-tight self-stretch">
            2. HIDE ALEX
          </a>
        </div>
        <div className="text-white text-opacity-40 text-center text-xs font-extrabold tracking-tight self-stretch whitespace-nowrap">
          <a href="#" className="text-white text-opacity-40 text-center text-xs font-extrabold tracking-tight self-stretch whitespace-nowrap">
            3.WAGER
          </a>
        </div>
      </nav>
    );
}

function Section() {
    return (
      <section className="justify-center items-center bg-sky-400 self-stretch flex w-full flex-col mt-2 px-5 py-4 max-md:mr-px">
        <h1 className="text-black text-center text-3xl font-extrabold leading-8 self-center max-w-[274px]"> FIND ALEX </h1>
      </section>
    );
}

type HideAlexProps = {
    handleButtonClick: (text: string, opponent: string) => void;
    opponent: string;
}

function ChooseLocation({ handleButtonClick, opponent }: HideAlexProps) {
    const [answer, setAnswer] = useState('');

    const onButtonClick = (text: string) => {
        handleButtonClick(text, opponent);  // Use the prop here
        setAnswer(text);
        console.log(answer);
        console.log(opponent);
    };

    return (
        <div>
            <section className="self-center flex w-[298px] max-w-full items-start justify-between gap-5 mt-16 mb-16 max-md:mt-10">
                <div className="flex flex-col self-start">
                    <button onClick={() => onButtonClick('In Weeds')} className="flex flex-col items-center w-[150px] hover:opacity-100">
                        <img
                            loading="lazy"
                            src={inWeedsImg}
                            className={`aspect-square object-cover object-center w-[100px] h-[100px] overflow-hidden rounded-[50%] ${answer === 'In Weeds' ? '' : 'opacity-40'}`}
                            alt="In Weeds"
                        />
                        <div className={`text-center text-sm font-extrabold mt-2.5 whitespace-nowrap ${answer === 'In Weeds' ? 'text-lime-600' : 'text-white opacity-40 hover:text-lime-600'}`}>
                            In Weeds
                        </div>
                    </button>
                </div>
                <div className="flex flex-col self-start">
                    <button onClick={() => onButtonClick('Behind Building')} className="flex flex-col items-center w-[150px] hover:opacity-100">
                        <img
                            loading="lazy"
                            src={behindBuildingImg}
                            className={`aspect-square object-cover object-center w-[100px] h-[100px] overflow-hidden rounded-[50%] ${answer === 'Behind Building' ? '' : 'opacity-40'}`}
                            alt="Behind Building"
                        />
                        <div className={`text-center text-sm font-extrabold mt-2.5 whitespace-nowrap ${answer === 'Behind Building' ? 'text-lime-600' : 'text-white opacity-40 hover:text-lime-600'}`}>
                            Behind Building
                        </div>
                    </button>
                </div>
            </section>
            {answer && (
                <p className="text-lime-600 text-center text-sm font-extrabold tracking-tight self-center mt-20 whitespace-nowrap max-md:mt-10">
                    You chose to hide Alex {answer}!
                </p>
            )}
        </div>
    );
}




type NextButtonProps = {
    isDisabled: boolean;
    answer: string;
    opponent: string;
}


function NextButton({isDisabled, answer, opponent}: NextButtonProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToStartWager = () => {
        console.log(opponent);
        console.log(answer);
        navigate('/start-wager', {
            state: {...location.state, opponent, answer}
        });
    }
    return (
        <button
            onClick={navigateToStartWager}
            disabled={isDisabled}
            className={`text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap
                        ${isDisabled ? 'bg-opacity-40' : 'hover:bg-[#4EC331]'}
                        bg-lime-600 self-stretch w-full mt-4 p-5 rounded-[200px] max-md:ml-px max-md:mt-10`}
        >
            NEXT
        </button>
    );
}

function FindAlex() {
    const location = useLocation();
    const opponentFromLocation = location.state?.opponent || "N/A";
    console.log(opponentFromLocation);
    const answerFromLocation = location.state?.answer || '';


    const [answer, setAnswer] = useState(answerFromLocation);
    const [opponent, setOpponent] = useState(opponentFromLocation);
    const handleButtonClick = (text: SetStateAction<string>, opponent: SetStateAction<string>) => {
        setAnswer(text);
        setOpponent(opponent);
        console.log(opponent);
        console.log(answer);
    }

    return (
        <main className="h-[calc(100vh-4rem)] flex flex-col justify-between bg-neutral-900">
            <div className="items-center bg-neutral-900 flex w-full flex-col px-5">
                <Navigation />
                <Section />
                <ChooseLocation handleButtonClick={handleButtonClick} opponent={opponent}/>
                <NextButton isDisabled={!answer} answer={answer} opponent={opponent}/>
            </div>
        </main>
    );
}

export default FindAlex;