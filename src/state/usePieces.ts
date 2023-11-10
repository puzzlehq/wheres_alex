import { useRecords } from "@puzzlehq/sdk";
import { useMemo } from "react";

export const usePieces = () => {
  const {
    records,
    error,
    loading,
    refetch
  } = useRecords({
    filter: {
      programId: 'cflip_testing_123_token.aleo',
      type: 'unspent'
    },
  });

  // if (records.length > 0) {
  //   console.log('plaintext', records[0].plaintext);
  // }

  const totalBalance = useMemo(() => {
    if (records.length > 0) {
      return records
        .filter(record => !record.spent)
        .map(record => {
          const amount = record.plaintext.match(/amount:(\d+)u64/);
          return amount ? parseInt(amount[1]) : 0;
        })
        .reduce((total, amount) => {
          return (total ?? 0) + (amount ?? 0);
        })
    }
    return 0;
  }, [records]);

  return { pieces: records, totalBalance, loading, error, refetch };
};