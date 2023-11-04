/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PuzzleAccount from '../models/account';
import behindBuildingImg from '../assets/behind_building.svg';
import inWeedsImg from '../assets/in_weeds.svg';
import { useAccount, useRequestCreateEvent, useRecords } from "@puzzlehq/sdk";
import { EventType } from '@puzzlehq/types';

function Section() {
    return (
      <section className="justify-center items-center bg-pink-300 self-stretch flex w-full flex-col mt-2 px-5 py-4 max-md:mr-px">
        <h1 className="text-black text-center text-3xl font-extrabold leading-8 self-center max-w-[274px]"> REVIEW AND KICKOFF GAME </h1>
      </section>
    );
}

function OpponentSection() {
    const location = useLocation();
    const opponent = location.state?.opponent || "N/A";

    // Shorten the opponent string
    const displayOpponent =
        opponent.length > 9
        ? opponent.slice(0, 5) + "..." + opponent.slice(-4)
        : opponent;

    return (
      <div className="text-white text-center text-xs font-bold self-center mt-5 whitespace-nowrap">
        You are challenging
        <div className="border-[color:var(--White,#FCFCFC)] bg-zinc-50 self-center flex w-[155px] max-w-full flex-col mt-1.5 mb-1.5 px-5 py-4 rounded-[200px] border-2 border-solid">
          <div className="text-neutral-900 text-center text-xs font-bold self-center whitespace-nowrap">
            {displayOpponent}
          </div>
        </div>
        to find where you hid Alex!
      </div>
    );
}


function WagerSection() {
    const location = useLocation();
    const amount = location.state?.amount || 0;

    return (
      <div className="border-[color:var(--Green,#4EC331)] self-center flex w-[149px] max-w-full flex-col mt-9 pb-3.5 border-[3px] border-solid">
        <div className="text-neutral-900 text-center text-xs font-extrabold leading-3 bg-lime-600 self-stretch w-full px-5 py-2">
          WAGER
        </div>
        <div className="self-center flex w-[121px] max-w-full items-start gap-2.5 mt-2.5">
          <div className="text-lime-600 text-center text-3xl font-bold self-center my-auto">
            {amount}
          </div>
          <div className="text-lime-600 text-center text-base font-bold leading-4 self-stretch">
            Puzzle Pieces
          </div>
        </div>
      </div>
    );
}

function AnswerSection() {
    const location = useLocation();
    const answer = location.state?.answer || "N/A";

    return (
        <div className="flex w-full flex-col items-center">
            <div className="self-center flex w-[298px] max-w-full items-start justify-between gap-5 mt-9">
                <div className="flex flex-col self-start">
                    <img
                        loading="lazy"
                        src={inWeedsImg}
                        className={`aspect-square object-cover object-center w-full overflow-hidden self-stretch rounded-[50%]
                        ${answer === "In Weeds" ? "" : "opacity-40"}`}
                        alt="In Weeds"
                    />
                    <div
                        className={`text-center text-sm font-extrabold tracking-tight self-center mt-2.5 whitespace-nowrap
                        ${answer === "In Weeds" ? "" : "opacity-40"}
                        ${answer === "In Weeds" ? "text-lime-600" : "text-white"}`}>
                        In Weeds
                    </div>
                </div>
                <div className="flex flex-col self-start">
                    <img
                        loading="lazy"
                        src={behindBuildingImg}
                        className={`aspect-square object-cover object-center w-full overflow-hidden self-stretch rounded-[50%]
                        ${answer === "Behind Building" ? "" : "opacity-40"}`}
                        alt="Behind Building"
                    />
                    <div
                        className={`text-center text-sm font-extrabold tracking-tight self-center mt-2.5 whitespace-nowrap
                        ${answer === "Behind Building" ? "" : "opacity-40"}
                        ${answer === "Behind Building" ? "text-lime-600" : "text-white"}`}>
                        Behind Building
                    </div>
                </div>
            </div>
            <div className="text-lime-600 text-center text-sm font-extrabold tracking-tight self-center mt-8 whitespace-nowrap">
                You chose to hide Alex {answer}!
            </div>
        </div>
    );
}

type Props = {
    account: PuzzleAccount;
};

function KickoffButton ( { account }: Props ) {


    const navigate = useNavigate();
    const location = useLocation();
    // const player_account = account.address;
    const opponent = location.state?.opponent || "N/A";
    const amount = location.state?.amount || 0;
    const answer = location.state?.answer || "N/A";
    const [gameMultisig, setGameMultisig] = useState<string>("");
    const [eventID, setEventID] = useState<string>("");
    const [seed, setSeed] = useState<Uint8Array>(new Uint8Array());
    const { records, request } = useRecords({
        filter: { programId: 'cflip_gm_aleo_testing_123.aleo', type: 'unspent' }
    });

    const { requestCreateEvent, eventId, requestEventError, requestEventLoading } = useRequestCreateEvent({
        type: EventType.Execute,
        programId: 'cflip_gm_aleo_testing_123.aleo',
        functionId: 'mint',
        fee: 10000,
        inputs: ["10u64", "aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls"]
    });

    // useEffect(() => {
    //     request();
    // }, []);

    // if (records) {
    //     console.log(records);
    // }


    //     inputs: ["{
//   owner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
//   amount: 10u64.private,
//   _nonce: 5625235871236005310515293264000494952576041125138106701418752227259843614760group.public
// }",

    // useEffect(() => {
    //     function generateGameMultisig(opponent: string, player_account: string): { gameMultisig: string; seed: Uint8Array; } {
    //         // Our logic to generate gameMultisig and seed using hooks to wallet wasm
    //         return {
    //             gameMultisig: "ms_" + opponent + player_account, // example outputs
    //             seed: new Uint8Array(),
    //         };
    //     }
    //     const result = generateGameMultisig(opponent, player_account);
    //     setGameMultisig(result.gameMultisig);
    //     setSeed(result.seed);
    // }, [opponent, player_account]);

    // useEffect(() => {
    //     if (eventID) {
    //         navigate("/game-started", {
    //             state: { gameMultisig, eventID }
    //         });
    //     }
    // }, [eventID, navigate, gameMultisig]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function proposeGame(opponent: string, player_account: string, gameMultisig: string, seed: Uint8Array, amount: number, answer: string) {
        const result = opponent + player_account + gameMultisig + seed.toString() + amount.toString() + answer;
        // requestCreateEvent()
        setEventID(result);
    }
    return (
        <button
            onClick={() => console.log('kickoff')}
            className={`text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap
                        bg-lime-600 self-stretch w-full mt-4 p-5 rounded-[200px] max-md:ml-px max-md:mt-10`}
        >
            KICKOFF GAME!
        </button>
    );
}

function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const opponent = location.state?.opponent || "N/A";
    const answer = location.state?.answer || "N/A";
    const amount = location.state?.amount || "N/A";

    const navigateBackToStartWager = () => {
        navigate('/start-wager', {
            state: {opponent, answer, amount}
        });  // Navigate to the start-wager page
    }
    return (
        <button
            onClick={navigateBackToStartWager}
            className={`text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap
                bg-zinc-500 self-stretch w-full mt-4 p-5 rounded-[200px] max-md:ml-px max-md:mt-10`}
            >
            BACK
        </button>
    );
}

function ConfirmStartGame ( { account }: Props) {
    console.log(account)

    return (
        <main className="h-[calc(100vh-4rem)] flex flex-col justify-between bg-neutral-900">
            <div className="items-center bg-neutral-900 flex w-full flex-col px-5">
                <Section />
                <OpponentSection />
                <WagerSection />
                <AnswerSection />
                <KickoffButton account={account}/>
                <BackButton />
            </div>
        </main>
    );
}

export default ConfirmStartGame;