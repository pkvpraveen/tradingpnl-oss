import { RootState } from '../../../types';
import { createSelector } from '@reduxjs/toolkit';
import { getTotalCharges, initialState } from './slice';

export const selectDomain = (state: RootState) => state.angel || initialState;
export const selectAngelEQTrades = createSelector(
  [selectDomain],
  state => state.eqTrades,
);
export const selectAngelFnOTrades = createSelector(
  [selectDomain],
  state => state.fnoTrades,
);
function getResidueTrades(residues) {
  const trades: Array<any> = [];
  if (residues) {
    Object.keys(residues).forEach(key => {
      if (residues[key].buys.length > 0) {
        trades.push(...residues[key].buys);
      } else if (residues[key].sells.length > 0) {
        trades.push(...residues[key].buys);
      }
    });
  }
  return trades;
}
export const selectAngelEQResidue = createSelector([selectDomain], state =>
  getResidueTrades(state.eqResidue),
);
export const selectAngelFnOResidue = createSelector([selectDomain], state =>
  getResidueTrades(state.fnoResidue),
);

export const selectAngelEQGrossPnl = createSelector([selectDomain], state => {
  return state.eqTrades.reduce((sum, trade) => sum + trade.profit, 0);
});
export const selectAngelFnOGrossPnl = createSelector([selectDomain], state => {
  return state.fnoTrades.reduce((sum, trade) => sum + trade.profit, 0);
});
export const selectAngelEQCharges = createSelector([selectDomain], state => {
  return state.eqCharges;
});
export const selectAngelFnOCharges = createSelector([selectDomain], state => {
  return state.fnoCharges;
});
export const selectAngelEQResidueCharges = createSelector(
  [selectDomain],
  state => {
    return getTotalCharges(getResidueTrades(state.eqResidue));
  },
);
export const selectAngelFnOResidueCharges = createSelector(
  [selectDomain],
  state => {
    return getTotalCharges(getResidueTrades(state.fnoResidue));
  },
);
