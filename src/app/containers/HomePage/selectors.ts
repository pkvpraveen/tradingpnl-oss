import { RootState } from '../../../types';
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.home || initialState;
export const selectBroker = createSelector(
  [selectDomain],
  state => state.broker,
);
