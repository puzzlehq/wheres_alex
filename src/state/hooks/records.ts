import { useRecords } from "@puzzlehq/sdk";

export const useGameRecords = () => {
  const { records } = useRecords({
    filter: { programIds: ['wheres_alex_v012.aleo', 'puzzle_pieces_v012.aleo', 'multiparty_pvp_utils_v012.aleo'], type: 'unspent' },
  })
  const gameNotifications = records?.filter((record) => record.programId === 'wheres_alex_v012.aleo');
  const puzzleRecords = records?.filter((record) => record.programId === 'puzzle_pieces_v012.aleo');
  const utilRecords = records?.filter((record) => record.programId === 'multiparty_pvp_utils_v012.aleo');

  console.log([puzzleRecords, gameNotifications, utilRecords])

  return { puzzleRecords, gameNotifications, utilRecords };
}