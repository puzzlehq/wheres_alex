export type NotifyGameStart = {
  gameMultisig: string;
  player: string;
  wager: string;
  action: 'Start';
};

export type NotifyFinish = {
  gameMultisig: string;
  player: string;
  wager: string;
  win: boolean;
  action: 'Finish';
};

export type NotifyPendingAccept = {
  gameMultisig: string;
  player: string;
  wager: string;
  action: 'Reneg';
};

export type NotifyRenegStart = {
  gameMultisig: string;
  player: string;
  wager: string;
  action: 'Delete';
};

export type NotifyClaimFinish = {
  gameMultisig: string;
  player: string;
  blockheight: number;
  wager: string;
  win: boolean;
  action: 'Claim';
};

type GameState =
  | NotifyGameStart
  | NotifyFinish
  | NotifyPendingAccept
  | NotifyRenegStart
  | NotifyClaimFinish;

export default GameState;
