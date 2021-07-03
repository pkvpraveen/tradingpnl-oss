import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.readPnL || initialState;

export const selectReadPnL = createSelector(
  [selectDomain],
  readPnLState => readPnLState,
);

export const selectFnOData = createSelector([selectDomain], readPnLState => {
  return readPnLState.fnoData;
});

export const selectDeliveryData = createSelector(
  [selectDomain],
  readPnlState => {
    return readPnlState.eqData;
  },
);
