import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, SupportedBrokers } from './types';

// The initial state of the ReadPnL container
export const initialState: ContainerState = {
  broker: 'upstox',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateBroker(state, action: PayloadAction<SupportedBrokers>) {
      state.broker = action.payload;
    },
  },
});

export const { actions: homeActions, reducer, name: sliceKey } = homeSlice;
