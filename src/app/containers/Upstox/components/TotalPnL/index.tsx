/**
 *
 * TotalPnL
 *
 */
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectUpstoxDeliveryData, selectUpstoxFnOData } from '../../selectors';
import { TotalPnLChart } from '../../../../components/TotalPnLChart';

export function TotalPnL() {
  const deliveryData = useSelector(selectUpstoxDeliveryData);
  const fnoData = useSelector(selectUpstoxFnOData);
  const eqGrossPnL = deliveryData?.grossPnL;
  const eqNetPnL = deliveryData?.netPnL;
  const eqCharges = deliveryData?.charges;
  const fnoGrossPnL = fnoData?.grossPnL;
  const fnoNetPnL = fnoData?.netPnL;
  const fnoCharges = fnoData?.charges;
  return (
    <TotalPnLChart
      eqCharges={eqCharges}
      eqGrossPnL={eqGrossPnL}
      eqNetPnL={eqNetPnL}
      fnoCharges={fnoCharges}
      fnoGrossPnL={fnoGrossPnL}
      fnoNetPnL={fnoNetPnL}
    />
  );
}
