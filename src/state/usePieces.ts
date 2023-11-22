import { getRecords, RecordWithPlaintext } from '@puzzlehq/sdk';
import { useEffect, useMemo, useState } from 'react';

export const usePieces = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<RecordWithPlaintext[]>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const response = await getRecords({
      filter: {
        programId: 'puzzle_pieces_v007.aleo',
        type: 'unspent',
      },
    });
    if (response.error) {
      setError(response.error);
    } else if (response.records) {
      setRecords(response.records);
    }
    setLoading(false);
  };

  const { totalBalance, availableBalance, largestPiece } = useMemo(() => {
    if (records.length > 0) {
      let availableBalance = 0;
      let largestPiece = records[0];
      const totalBalance = records
        .filter((record) => !record.spent)
        .map((record) => {
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
        });
      return { totalBalance, availableBalance, largestPiece };
    }
    return { totalBalance: 0, availableBalance: 0, largestPiece: undefined };
  }, [records]);

  return {
    pieces: records,
    totalBalance,
    availableBalance,
    largestPiece,
    loading,
    error,
    refetch: fetch,
  };
};
