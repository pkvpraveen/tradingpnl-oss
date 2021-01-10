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
    readPnLState?.intradayData?.forEach((row: Array<string>) => {
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
  let count = 0;
  let fnoStarted = false;
  let fnoEnded = false;
  const fno: Array<Array<string>> = [];
  readPnLState?.fnoData?.forEach((row: Array<string>) => {
    if (row[1] === 'Scrip Name') {
      count++;
    }
    if (count > 1) {
      fnoStarted = true;
    }
    if (fnoStarted && row[1] === null) {
      fnoEnded = true;
    }
    if (fnoStarted && !fnoEnded) {
      fno.push(row.slice(1));
    }
  });
  return fno;
});

export const selectDeliveryData = createSelector(
  [selectDomain],
  readPnlState => {
    let count = 0;
    let deliveryStarted = false;
    let deliveryEnded = false;
    const delivery: Array<Array<string>> = [];
    readPnlState?.intradayData?.forEach((row: Array<string>) => {
      if (row[1] === 'Scrip Name') {
        count++;
      }
      if (count > 1) {
        deliveryStarted = true;
      }
      if (deliveryStarted && row[1] === null) {
        deliveryEnded = true;
      }
      if (deliveryStarted && !deliveryEnded) {
        delivery.push(row.slice(1, row.length - 1));
      }
    });
    return delivery;
  },
);
