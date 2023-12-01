import { getEvent } from '@puzzlehq/sdk';
import { useQuery } from 'react-query';

export const useEventQuery = (id: string | undefined) => {
  return useQuery(
    ['event', id],
    async () => {
      if (!id) return;
      return await getEvent(id);
    },
    {
      enabled: !!id, // Only run the query if `id` is not null
      refetchInterval: 5000, // Refetch the data every 5 seconds
    }
  );
};
