import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ReadPnL container
export const initialState: ContainerState = {};

const readPnLSlice = createSlice({
  name: 'readPnL',
  initialState,
  reducers: {
    loadEQData(state, action: PayloadAction<any>) {
      state.eqData = transformData(action.payload);
    },
    loadFnOData(state, action: PayloadAction<any>) {
      state.fnoData = transformData(action.payload);
    },
  },
});

export const {
  actions: readPnLActions,
  reducer,
  name: sliceKey,
} = readPnLSlice;

function getCharges(rows) {
  return rows.filter(r => r[0] === 'TOTAL')[0][1];
}

function transformData(rows) {
  const grossPnL = parseFloat(rows[8][1]);
  const netPnL = parseFloat(rows[9][1]);
  const charges = parseFloat(getCharges(rows));
  const trades: Array<Array<string>> = [];
  let started = false;
  let ended = false;
  rows.forEach((row: Array<string>) => {
    if (row[0]?.trim() === 'Scrip Name') {
      started = true;
    }
    if (started && row[1] === null) {
      ended = true;
    }
    if (started && !ended) {
      trades.push(row);
    }
  });
  return { grossPnL, netPnL, charges, trades: trades.slice(1) };
}
