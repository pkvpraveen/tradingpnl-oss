import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.upstox || initialState;

export const selectUpstoxFnOData = createSelector(
  [selectDomain],
  readPnLState => {
    return readPnLState.fnoData;
  },
);

export const selectUpstoxDeliveryData = createSelector(
  [selectDomain],
  readPnlState => {
    return readPnlState.eqData;
  },
);
