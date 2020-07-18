import produce from 'immer';
import merge from 'lodash/merge';
import { useCallback, useEffect, useState } from 'react';

import { AppState, state$ } from '../state';

export const useCentralState = () => {
  const [state, setState] = useState(state$.getValue());

  useEffect(() => {
    const subscription = state$.subscribe(setState);
    return subscription.unsubscribe;
  }, [setState]);

  const patchState = useCallback(
    (patch: Partial<AppState>) => {
      state$.next(
        produce(state, (draft) => {
          merge(draft, patch);
        }),
      );
    },
    [state],
  );
  return [state, patchState] as const;
};
