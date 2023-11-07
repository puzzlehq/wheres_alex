type NotifyGameStart = {
    gameMultisig: string;
    player: string;
    wager: string;
    action: 'Start';
};

type NotifyFinish = {
    gameMultisig: string;
    player: string;
    wager: string;
    action: 'Finish';
};

type NotifyPendingAccept = {
    gameMultisig: string;
    player: string;
    wager: string;
    action: 'Reneg';
};

type NotifyRenegStart = {
    gameMultisig: string;
    player: string;
    wager: string;
    action: 'Delete';
};

type NotifyClaimFinish = {
    gameMultisig: string;
    player: string;
    blockheight: number;
    wager: string;
    action: 'Claim';
};

type GameState = NotifyGameStart | NotifyFinish | NotifyPendingAccept | NotifyRenegStart | NotifyClaimFinish;

export default GameState;