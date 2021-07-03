import React from 'react';
import { BarChart } from '../../../../components/BarChart';
import { useSelector } from 'react-redux';
import { selectFnOData } from '../../selectors';
import styled, { useTheme } from 'styled-components/macro';
import moment from 'moment';

export function ExpiryWisePnLGraph() {
  const fnoData = useSelector(selectFnOData);
  const theme = useTheme();
  const graphData: any = {};
  if (fnoData) {
    const sortedByDate = fnoData.trades.slice().sort((a, b) => {
      const a1 = moment(a.buyDate, 'DD-MM-YYYY');
      const b1 = moment(b.buyDate, 'DD-MM-YYYY');
      if (a1.isBefore(b1)) return -1;
      else if (b1.isBefore(a1)) return 1;
      else return 0;
    });
    const regex = /([A-Z]+[0-9][0-9][A-Z][A-Z][A-Z])+/g;
    sortedByDate.forEach(row => {
      const match = row.scripCode.match(regex) || [''];
      const scrip = match[0];
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
    <Div>
      <BarChart
        data={{
          labels: Object.keys(graphData),
          datasets: [
            {
              label: 'Expiry wise P&L',
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
