import React from 'react';
import { TotalPnLChart } from '../../../components/TotalPnLChart';
import { useSelector } from 'react-redux';
import {
  selectAngelEQCharges,
  selectAngelEQGrossPnl,
  selectAngelEQResidueCharges,
  selectAngelFnOCharges,
  selectAngelFnOGrossPnl,
  selectAngelFnOResidueCharges,
} from '../selectors';

export function TotalPnL() {
  const eqGrossPnL = useSelector(selectAngelEQGrossPnl);
  const fnoGrossPnL = useSelector(selectAngelFnOGrossPnl);
  const eqCharges = useSelector(selectAngelEQCharges);
  const fnoCharges = useSelector(selectAngelFnOCharges);
  const fnoResidueCharges = useSelector(selectAngelFnOResidueCharges);
  const eqResidueCharges = useSelector(selectAngelEQResidueCharges);
  const fnoNetPnL = fnoGrossPnL - (fnoCharges - fnoResidueCharges);
  const eqNetPnL = eqGrossPnL - (eqCharges - eqResidueCharges);

  return (
    <div>
      <TotalPnLChart
        eqGrossPnL={eqGrossPnL}
        fnoGrossPnL={fnoGrossPnL}
        eqCharges={eqCharges - eqResidueCharges}
        fnoCharges={fnoCharges - fnoResidueCharges}
        fnoNetPnL={fnoNetPnL}
        eqNetPnL={eqNetPnL}
      />
    </div>
  );
}
