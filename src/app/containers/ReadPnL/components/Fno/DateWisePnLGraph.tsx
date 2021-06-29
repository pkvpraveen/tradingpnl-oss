import React from 'react';
import { BarChart } from '../../../../components/BarChart';
import moment from 'moment';
import { useTheme } from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { selectFnOData } from '../../selectors';
export function DateWisePnLGraph() {
  const theme = useTheme();
  const fnoData = useSelector(selectFnOData);

  function getDate(row) {
    const buyDate = moment(row[5], 'DD-MM-YYYY');
    const sellDate = moment(row[9], 'DD-MM-YYYY');
    return buyDate.isAfter(sellDate) ? buyDate : sellDate;
  }
  const graphData: any = {};
  const sortedByDate = fnoData?.trades.slice().sort((a, b) => {
    const a1 = getDate(a);
    const b1 = getDate(b);
    if (a1.isBefore(b1)) return -1;
    else if (b1.isBefore(a1)) return 1;
    else return 0;
  });
  sortedByDate?.forEach(row => {
    const profit = parseFloat(row[14]);
    const date = getDate(row).format('DD MMM YYYY');
    if (!graphData[date]) {
      graphData[date] = profit;
    } else {
      graphData[date] += profit;
    }
  });
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
  );
}
