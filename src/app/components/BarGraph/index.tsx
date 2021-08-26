import React from 'react';
import { BarChart } from '../BarChart';
import { useTheme } from 'styled-components/macro';

export function BarGraph({ graphData }) {
  const theme = useTheme();
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
