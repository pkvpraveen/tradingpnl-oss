import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ReadPnL container
export const initialState: ContainerState = {
  intradayData: [],
  fnoData: [],
};

const readPnLSlice = createSlice({
  name: 'readPnL',
  initialState,
  reducers: {
    loadIntradayData(state, action: PayloadAction<any>) {
      state.intradayData = action.payload;
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
