import React from 'react';
import { BarChart } from '../BarChart';
import styled, { useTheme } from 'styled-components/macro';

export function DateWisePnLGraphView({ trades, getDate }) {
  const theme = useTheme();

  const graphData: any = {};
  const sortedByDate = trades.slice().sort((a, b) => {
    const a1 = getDate(a);
    const b1 = getDate(b);
    if (a1.isBefore(b1)) return -1;
    else if (b1.isBefore(a1)) return 1;
    else return 0;
  });
  sortedByDate?.forEach(row => {
    const profit = row.profit;
    const date = getDate(row).format('DD MMM YYYY');
    if (!graphData[date]) {
      graphData[date] = profit;
    } else {
      graphData[date] += profit;
    }
  });
  const options = {
    showAllTooltips: true,
    responsive: true,
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
    <Div>
      <h3 style={{ color: theme.text }}>FnO Date wise p&l</h3>
      <BarChart
        data={{
          labels: Object.keys(graphData),
          datasets: [
            {
              label: 'Date Wise P&L',
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
    </Div>
  );
}

const Div = styled.div`
  padding: 5rem 0;
`;
