import React from 'react';
import { TotalPnLChart } from '../../../components/TotalPnLChart';
import { useSelector } from 'react-redux';
import {
  selectAngelEQCharges,
  selectAngelEQGrossPnl,
  selectAngelFnOCharges,
  selectAngelFnOGrossPnl,
} from '../selectors';

export function TotalPnL() {
  const eqGrossPnL = useSelector(selectAngelEQGrossPnl);
  const fnoGrossPnL = useSelector(selectAngelFnOGrossPnl);
  const eqCharges = useSelector(selectAngelEQCharges);
  const fnoCharges = useSelector(selectAngelFnOCharges);
  const fnoNetPnL = fnoGrossPnL - fnoCharges;
  const eqNetPnL = eqGrossPnL - eqCharges;

  return (
    <div>
      <TotalPnLChart
        eqGrossPnL={eqGrossPnL}
        fnoGrossPnL={fnoGrossPnL}
        eqCharges={eqCharges}
        fnoCharges={fnoCharges}
        fnoNetPnL={fnoNetPnL}
        eqNetPnL={eqNetPnL}
      />
    </div>
  );
}
