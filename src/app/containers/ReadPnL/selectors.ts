import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.readPnL || initialState;

export const selectReadPnL = createSelector(
  [selectDomain],
  readPnLState => readPnLState,
);
export const selectIntradayData = createSelector(
  [selectDomain],
  readPnLState => {
    let intradayStarted = false;
    let intradayEnded = false;
    const intraday: Array<Array<string>> = [];
    readPnLState?.eqData?.trades.forEach((row: Array<string>) => {
      if (row[1] === 'Scrip Name') {
        intradayStarted = true;
      }
      if (intradayStarted && row[1] === null) {
        intradayEnded = true;
      }
      if (intradayStarted && !intradayEnded) {
        intraday.push(row.slice(1));
      }
    });
    return intraday;
  },
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
