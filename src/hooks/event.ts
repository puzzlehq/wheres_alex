import { getEvent } from '@puzzlehq/sdk';
import { useQuery } from '@tanstack/react-query';

type UseEventQueryProps = {
  id?: string;
  address?: string;
};

export const useEventQuery = ({ id, address }: UseEventQueryProps) => {
  return useQuery({
    queryKey: ['event', id ?? ''],
    queryFn: async () => {
      if (!id) return;
      const result = await getEvent({ id, address });
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
