import React from 'react';
import { useTheme } from 'styled-components/macro';
import { Box } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

export function BarChart({
  rows,
}: {
  rows: Array<{ profitability: number; numberOfProfitableSimulations: number }>;
}) {
  const theme = useTheme();
  const options = {
    showAllTooltips: true,
    plugins: {
      datalabels: {
        formatter: function (value, context) {
          return value + '%';
        },
      },
    },
    maintainAspectRatio: false,
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
  const graphData: any = {};
  rows.forEach(
    row =>
      (graphData[`${row.profitability}`] = row.numberOfProfitableSimulations),
  );
  return (
    <Box mt={2}>
      <Bar
        width={100}
        height={500}
        data={{
          labels: Object.keys(graphData),
          datasets: [
            {
              label: 'PoP Vs Successful Simulations',
              data: Object.values(graphData),
              backgroundColor: 'rgba(11, 156, 49, 0.7)',
              borderWidth: 1,
            },
          ],
        }}
        options={options}
      />
    </Box>
  );
}
