export type NotifyGameStart = {
  multisig: string;
  opponent: string;
  wager: number;
  action: 'Start';
};

export type NotifyFinish = {
  multisig: string;
  opponent: string;
  wager: number;
  answer: Answer;
  action: 'Finish';
};

export type NotifyPendingAccept = {
  multisig: string;
  opponent: string;
  wager: number;
  action: 'Renege';
};

export type NotifyRenegeStart = {
  multisig: string;
  opponent: string;
  wager: number;
  action: 'Delete';
};

export type NotifyClaimFinish = {
  multisig: string;
  opponent: string;
  blockheight: number;
  wager: number;
  win: boolean;
  answer: Answer;
  action: 'Claim';
};

type GameState =
  | NotifyGameStart
  | NotifyFinish
  | NotifyPendingAccept
  | NotifyRenegeStart
  | NotifyClaimFinish;

export default GameState;

export enum Answer {
  InTheWeeds = 'In the Weeds',
  BehindTheBuilding = 'Behind the Building'
}