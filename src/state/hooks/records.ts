import { useRecords } from "@puzzlehq/sdk";

export const useGameRecords = () => {
  const { records } = useRecords({
    filter: { programIds: ['wheres_alex_v011.aleo', 'puzzle_pieces_v011.aleo', 'multiparty_pvp_utils_v011.aleo'], type: 'unspent' },
  })
  const gameRecords = records?.filter((record) => record.programId === 'wheres_alex_v011.aleo');
  const puzzleRecords = records?.filter((record) => record.programId === 'puzzle_pieces_v011.aleo');
  const utilRecords = records?.filter((record) => record.programId === 'multiparty_pvp_utils_v011.aleo');

  console.log([puzzleRecords, gameRecords, utilRecords])

  return { puzzleRecords, gameRecords, utilRecords };
}