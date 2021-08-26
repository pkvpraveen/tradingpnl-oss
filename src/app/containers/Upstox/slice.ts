import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, Trade } from './types';

// The initial state of the ReadPnL container
export const initialState: ContainerState = {};

const upstoxSlice = createSlice({
  name: 'upstox',
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

export const { actions: readPnLActions, reducer, name: sliceKey } = upstoxSlice;

function getCharges(rows) {
  return rows.filter(r => r[0] === 'TOTAL')[0][1];
}

function mapRow(row) {
  return {
    scripName: `${row[0]}`,
    scripCode: `${row[1]}`,
    symbol: `${row[2]}`,
    scriptOpt: `${row[4]}`,
    buyDate: `${row[5]}`,
    buyQuantity: parseInt(row[6]),
    buyRate: parseFloat(row[7]),
    buyAmount: parseFloat(row[8]),
    sellDate: `${row[9]}`,
    sellQuantity: parseInt(row[10]),
    sellRate: parseFloat(row[11]),
    sellAmount: parseFloat(row[12]),
    days: parseInt(row[13]),
    profit: parseFloat(row[14]),
  };
}

export const transformData = rows => {
  const grossPnL = parseFloat(rows[8][1]);
  const netPnL = parseFloat(rows[9][1]);
  const charges = parseFloat(getCharges(rows));
  const trades: Array<Trade> = [];
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
      trades.push(mapRow(row));
    }
  });
  return { grossPnL, netPnL, charges, trades: trades.slice(1) };
};
