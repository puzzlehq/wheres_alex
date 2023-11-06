/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PuzzleAccount from '../models/account';
import behindBuildingImg from '../assets/behind_building.svg';
import inWeedsImg from '../assets/in_weeds.svg';
import { useAccount, useRequestCreateEvent, useRecords, CreateEventRequestData } from "@puzzlehq/sdk";
import { EventType, Record } from '@puzzlehq/types';

export enum RecordType {
  unspent = 'unspent',
  spent = 'spent',
  all = 'all',
}

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
    const opponent = "aleo1muq22xpnzgaeqez0mgkdcau6kcjpk6ztey0u8yv34zcupk3hpczsmxeaww";
    const amount = 10;
    const answer = location.state?.answer === "In Weeds" ? "0field" : "1field";
    const [msSeed, setMsSeed] = useState<string>("1field")
    const [gameMultisig, setGameMultisig] = useState<string>("aleo1eqkje8cvr0twm07w4m5n356pju7njtfx75xp5zzvpg8yhgrnr58snq9kyu");
    const [programId, setProgramId] = useState<string>("cflip_gm_aleo_testing_123.aleo");
    const [functionId, setFunctionId] = useState("propose_game");
    const [wagerRecord, setWagerRecord] = useState<string>("");
    const [eventType, setEventType] = useState(
        EventType.Execute
    );
    const [msg, setMsg] = useState<string>("1field");
    const [mOfN, setMofN] = useState<string>("1u8");
    const [nonce, setNonce] = useState<string>("1field");

    const { fetchPage, records, loading, error, pageCount } = useRecords({
        filter: {
            programId: 'cflip_testing_123_token.aleo',
            type: RecordType.unspent,
        },
    }) as { fetchPage: () => void, records: Record[], loading: boolean, error: string, pageCount: number };

    useEffect(() => {
        fetchPage();
    }, []);

    const eventRequestData: CreateEventRequestData = {
        type: eventType,
        programId: programId,
        functionId: functionId,
        fee: 1.5,
        inputs: [msSeed, gameMultisig, opponent, wagerRecord, amount + "u64", "1field", "sign1qnhgv5vd5xrjvend63pgw2qj8f6zxhz5yk36r3nsxkgjz6285cp9gz332p7uyu6upujg0f4qf4cyqqamp5hh6kfg2nxhyfkk3lkrvpxlam644zwcpzuhnjsc08k76c40xc23gzdpsx8fkzgz6c02qs89q93j76sqw5svpfpe4yqtpa9g6zwsqs6y3r5pfamwk89hjveu44mqzxzltvg", msg, mOfN, nonce]
    };

    const { requestCreateEvent, eventId, requestEventError, requestEventLoading } = useRequestCreateEvent(eventRequestData);

    const extractAmountFromRecord = (amountStr: string): number => {
        const u64Index = amountStr.indexOf("u64");

        if (u64Index !== -1) {
            const numericPart = amountStr.slice(0, u64Index);
            return parseInt(numericPart, 10);
        }
        // todo: return you can't play, need puzz credits amounting to wager!
        return 0;
    }

    // get PuzzRecord >= wager
    useEffect(() => {
        if (records && !wagerRecord) {
            for (const record of records) {
                const recordAmount = extractAmountFromRecord(record.data.amount);
                if (recordAmount >= amount) {
                    const recordString = record.plaintext;
                    setWagerRecord(recordString);
                    break;
                }
            }
        }
    }, [records, amount, wagerRecord]);

    useEffect(() => {
        if (eventId) {
            navigate("/game-started", {
                state: { gameMultisig, eventId }
            });
        }
    }, [eventId, navigate, gameMultisig]);

    return (
        <button
            onClick={requestCreateEvent}
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