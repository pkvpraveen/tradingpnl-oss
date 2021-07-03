import React from 'react';
import { BarChart } from '../../../../components/BarChart';
import { useSelector } from 'react-redux';
import { selectDeliveryData } from '../../selectors';
import { useTheme } from 'styled-components/macro';
import { Trade } from '../../types';

export function ScriptWisePnLGraph() {
  const deliveryData = useSelector(selectDeliveryData);
  const theme = useTheme();
  const graphData: any = {};
  if (deliveryData) {
    deliveryData.trades.forEach((row: Trade) => {
      const scrip = row.scripName;
      graphData[scrip] = graphData[scrip]
        ? graphData[scrip] + row.profit
        : row.profit;
    });
  }
  const options = {
    showAllTooltips: true,

    tooltipEvents: [],
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: theme.border,
            zeroLineColor: theme.border,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: theme.border,
          },
        },
      ],
    },
  };
  return (
    <BarChart
      data={{
        labels: Object.keys(graphData),
        datasets: [
          {
            label: 'Profit',
            data: Object.values(graphData).map((v: any) => v.toFixed(2)),
            backgroundColor: Object.values(graphData).map((v: any) =>
              v > 0 ? 'rgba(11, 156, 49, 0.7)' : 'rgba(255, 0, 0, 0.7)',
            ),
            borderColor: Object.values(graphData).map((v: any) =>
              v > 0 ? 'rgba(11, 156, 49, 0.7)' : 'rgba(255, 0, 0, 0.7)',
            ),
            borderWidth: 1,
          },
        ],
      }}
      options={options}
    />
  );
}
