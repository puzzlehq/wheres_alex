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

  const { totalBalance, availableBalance } = useMemo(() => {
    if (records.length > 0) {
      let availableBalance = 0;
      const totalBalance = records
        .filter(record => !record.spent)
        .map(record => {
          const amount = record.plaintext.match(/amount:(\d+)u64/);
          if (amount) {
            const amountInt = parseInt(amount[1]);
            availableBalance = Math.max(availableBalance, amountInt);
            return amountInt;
          }
          return 0;
        })
        .reduce((total, amount) => {
          return (total ?? 0) + (amount ?? 0);
        })
      return { totalBalance, availableBalance };
    }
    return { totalBalance: 0, availableBalance: 0 };
  }, [records]);

  return { pieces: records, totalBalance, availableBalance, loading, error, refetch };
};