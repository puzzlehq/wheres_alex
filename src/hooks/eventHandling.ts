// useEventHandling.ts
import { useState, useEffect } from 'react';
import { EventStatus, useEvent } from '@puzzlehq/sdk';

type UseEventHandlingProps = {
  id?: string;
  address?: string;
  multisig?: boolean;
}

export const useEventHandling = ({id, address, multisig}: UseEventHandlingProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { event, error: _error } = useEvent({ id, address, multisig });
  const eventStatus = event?.status;

  useEffect(() => {
    event && console.log('Event:', event);
  }, [event]);

  useEffect(() => {
    const eventError = _error;
    eventError && setError(eventError);
  }, [_error]);

  useEffect(() => {
    if (eventStatus === EventStatus.Settled) {
      setLoading(false);
      setError(undefined);
    } else if (eventStatus === EventStatus.Failed) {
      setLoading(false);
      setError(event?.error);
    }
  }, [eventStatus]);

  return { loading, error, event, setLoading, setError };
};