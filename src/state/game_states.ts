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
  action: 'Renege';
};

export type NotifyRenegeStart = {
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
  | NotifyRenegeStart
  | NotifyClaimFinish;

export default GameState;

export enum Answer {
  InTheWeeds = 'In the Weeds',
  BehindTheBuilding = 'Behind the Building'
}

export const aleoAddressRegex = /^aleo1.{58}$/i;