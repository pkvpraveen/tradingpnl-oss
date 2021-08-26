import { RootState } from '../../../types';
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

export const selectDomain = (state: RootState) => state.angel || initialState;
export const selectAngelEQTrades = createSelector(
  [selectDomain],
  state => state.eqTrades,
);
export const selectAngelFnOTrades = createSelector(
  [selectDomain],
  state => state.fnoTrades,
);
export const selectAngelEQResidue = createSelector(
  [selectDomain],
  state => state.eqResidue,
);
export const selectAngelFnOResidue = createSelector(
  [selectDomain],
  state => state.fnoResidue,
);

export const selectAngelEQGrossPnl = createSelector([selectDomain], state => {
  return state.eqTrades.reduce((sum, trade) => sum + trade.profit, 0);
});
export const selectAngelFnOGrossPnl = createSelector([selectDomain], state => {
  return state.fnoTrades.reduce((sum, trade) => sum + trade.profit, 0);
});
