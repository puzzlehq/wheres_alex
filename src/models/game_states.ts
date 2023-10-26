type NotifyGameStart = {
    player: string;
    wager: string;
    action: 'Start';
};

type NotifyFinish = {
    player: string;
    wager: string;
    action: 'Finish';
};

type NotifyPendingAccept = {
    player: string;
    wager: string;
    action: 'Reneg';
};

type NotifyRenegStart = {
    player: string;
    wager: string;
    action: 'Delete';
};

type NotifyClaimFinish = {
    player: string;
    blockheight: number;
    wager: string;
    action: 'Claim';
};

type GameState = NotifyGameStart | NotifyFinish | NotifyPendingAccept | NotifyRenegStart | NotifyClaimFinish;

export default GameState;