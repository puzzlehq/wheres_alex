import { useRecords } from '@puzzlehq/sdk';

export const useMsRecords = (address?: string) => {
  const { records } = useRecords({
    filter: {
      programIds: [
        'wheres_alex_v014.aleo',
        'puzzle_pieces_v014.aleo',
        'multiparty_pvp_utils_v014.aleo',
      ],
      type: 'unspent',
    },
    address,
    multisig: true,
  });
  const msGameRecords = records?.filter(
    (record) => record.programId === 'wheres_alex_v014.aleo'
  );
  const msPuzzleRecords = records?.filter(
    (record) => record.programId === 'puzzle_pieces_v014.aleo'
  );
  const msUtilRecords = records?.filter(
    (record) => record.programId === 'multiparty_pvp_utils_v014.aleo'
  );

  console.log([msGameRecords, msPuzzleRecords, msUtilRecords]);

  return { msPuzzleRecords, msGameRecords, msUtilRecords };
};
