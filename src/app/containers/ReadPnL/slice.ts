import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ReadPnL container
export const initialState: ContainerState = {
  fnoData: [],
};

const readPnLSlice = createSlice({
  name: 'readPnL',
  initialState,
  reducers: {
    loadEQData(state, action: PayloadAction<any>) {
      state.eqData = populateEQData(action.payload);
    },
    loadFnOData(state, action: PayloadAction<any>) {
      state.fnoData = action.payload;
    },
  },
});

export const {
  actions: readPnLActions,
  reducer,
  name: sliceKey,
} = readPnLSlice;

function populateEQData(rows) {
  const grossPnL = rows[8][1];
  const netPnL = rows[9][1];
  const charges = rows[20][1];
  const trades: Array<Array<string>> = [];
  let started = false;
  let ended = false;
  rows.forEach((row: Array<string>) => {
    console.log(row[0]);
    if (row[0]?.trim() === 'Scrip Name') {
      console.log('started');
      started = true;
    }
    if (started && row[1] === null) {
      console.log('ended');
      ended = true;
    }
    if (started && !ended) {
      trades.push(row);
    }
  });
  return { grossPnL, netPnL, charges, trades };
}
