import { useRecords } from "@puzzlehq/sdk";

export const useMsRecords = (address?: string) => {
  const { records } = useRecords({
    filter: { programIds: ['wheres_alex_v012.aleo', 'puzzle_pieces_v012.aleo', 'multiparty_pvp_utils_v012.aleo'], type: 'unspent' },
    address
  })
  const msGameRecords = records?.filter((record) => record.programId === 'wheres_alex_v012.aleo');
  const msPuzzleRecords = records?.filter((record) => record.programId === 'puzzle_pieces_v012.aleo');
  const msUtilRecords = records?.filter((record) => record.programId === 'multiparty_pvp_utils_v012.aleo');

  console.log([msGameRecords, msPuzzleRecords, msUtilRecords])

  return { msPuzzleRecords, msGameRecords, msUtilRecords };
}