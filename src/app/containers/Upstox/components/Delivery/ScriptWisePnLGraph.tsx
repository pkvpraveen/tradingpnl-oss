import React from 'react';
import { useSelector } from 'react-redux';
import { selectUpstoxDeliveryData } from '../../selectors';
import { Trade } from '../../types';
import { BarGraph } from '../../../../components/BarGraph';

export function ScriptWisePnLGraph() {
  const deliveryData = useSelector(selectUpstoxDeliveryData);
  const graphData: any = {};
  if (deliveryData) {
    deliveryData.trades.forEach((row: Trade) => {
      const scrip = row.scripName;
      graphData[scrip] = graphData[scrip]
        ? graphData[scrip] + row.profit
        : row.profit;
    });
  }
  return <BarGraph graphData={graphData} />;
}
