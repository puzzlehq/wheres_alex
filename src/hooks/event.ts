import { getEvent } from '@puzzlehq/sdk';
import { useQuery } from '@tanstack/react-query';

export const useEventQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['event', id ?? ''],
    queryFn: async () => {
      if (!id) return;
      const result = await getEvent(id);
      if (result.error) {
        throw new Error(result.error);
      } else if (result.event) {
        return result.event;
      }
    },
    refetchInterval: 5_000, // Refetch every 5 seconds
    staleTime: 10_000,
    refetchIntervalInBackground: true,
    enabled: id !== undefined,
  });
};
