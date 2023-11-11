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

  const { totalBalance, availableBalance, largestPiece } = useMemo(() => {
    if (records.length > 0) {
      let availableBalance = 0;
      let largestPiece = records[0];
      const totalBalance = records
        .filter(record => !record.spent)
        .map(record => {
          const amount = record.plaintext.match(/amount:(\d+)u64/);
          if (amount) {
            /// find largestPiece (and thus availableBalance)
            const amountInt = parseInt(amount[1]);
            availableBalance = Math.max(availableBalance, amountInt);
            if (availableBalance == amountInt) {
              largestPiece = record;
            }
            return amountInt;
          }
          return 0;
        })
        .reduce((total, amount) => {
          /// sum up
          return total + amount;
        })
      return { totalBalance, availableBalance, largestPiece };
    }
    return { totalBalance: 0, availableBalance: 0, largestPiece: undefined };
  }, [records]);

  return { pieces: records, totalBalance, availableBalance, largestPiece, loading, error, refetch };
};