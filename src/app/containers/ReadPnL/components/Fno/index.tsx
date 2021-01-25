/**
 *
 * Fno
 *
 */
import * as React from 'react';
import moment from 'moment';
import { Table } from 'app/components/Table';
import { BarChart } from 'app/components/BarChart';
import { useTheme } from 'styled-components';

interface Props {
  fnoData: any;
}

export function Fno(props: Props) {
  const theme = useTheme();
  const { fnoData } = props;
  const columns = React.useMemo(
    () => [
      {
        Header: 'FnO',
        Footer: 'FnO',
        columns: [
          {
            Header: 'Scrip Name',
            accessor: 'scripName',
            Footer: ' ',
          },
          {
            Header: 'Scrip Code',
            accessor: 'scripCode',
            Footer: ' ',
          },
          {
            Header: 'Call/Put',
            accessor: 'callPut',
            Footer: ' ',
          },
          {
            Header: 'Expiry Date',
            accessor: 'expiryDate',
            sortType: (a, b) => {
              const a1 = moment(a.original.expiryDate, 'DD-MM-YYYY');
              const b1 = moment(b.original.expiryDate, 'DD-MM-YYYY');
              if (a1.isBefore(b1)) return 1;
              else if (b1.isBefore(a1)) return -1;
              else return 0;
            },
            Footer: ' ',
          },
          {
            Header: 'Strike Rate',
            accessor: 'strikeRate',
            Footer: ' ',
          },
          {
            Header: 'Buy Qty',
            accessor: 'buyQty',
            Footer: ' ',
          },
          {
            Header: 'Buy Avg',
            accessor: 'buyAvg',
            Footer: ' ',
          },
          {
            Header: 'Buy Amt',
            accessor: 'buyAmt',
            Footer: ' ',
          },
          {
            Header: 'Sell Qty',
            accessor: 'sellQty',
            Footer: ' ',
          },
          {
            Header: 'Sell Avg',
            accessor: 'sellAvg',
            Footer: ' ',
          },
          {
            Header: 'Sell Amt',
            accessor: 'sellAmt',
            Footer: ' ',
          },
          {
            Header: 'Turnover',
            accessor: 'turnover',
            Footer: info => {
              // Only calculate total visits if rows change
              const total = React.useMemo(
                () =>
                  info.rows
                    .reduce(
                      (sum, row) => parseFloat(row.values.turnover) + sum,
                      0,
                    )
                    .toFixed(2),
                [info.rows],
              );

              return <>Total turnover: {total}</>;
            },
          },
          {
            Header: 'Profit',
            accessor: 'profit',
            sortType: (a, b) => {
              var a1 = parseFloat(a.original.profit);
              var b1 = parseFloat(b.original.profit);
              if (a1 < b1) return 1;
              else if (b1 < a1) return -1;
              else return 0;
            },
            Footer: info => {
              // Only calculate total visits if rows change
              const total = React.useMemo(
                () =>
                  info.rows
                    .reduce(
                      (sum, row) => parseFloat(row.values.profit) + sum,
                      0,
                    )
                    .toFixed(2),
                [info.rows],
              );

              return <>Total profit: {total}</>;
            },
          },
        ],
      },
    ],
    [],
  );
  const data = fnoData.slice(1).map(row => {
    const profit = parseFloat(row[10]) - parseFloat(row[7]);
    return {
      [columns[0].columns[0].accessor]: row[0],
      [columns[0].columns[1].accessor]: row[1],
      [columns[0].columns[2].accessor]: row[2],
      [columns[0].columns[3].accessor]: row[3],
      [columns[0].columns[4].accessor]: row[4],
      [columns[0].columns[5].accessor]: row[5],
      [columns[0].columns[6].accessor]: row[6],
      [columns[0].columns[7].accessor]: row[7],
      [columns[0].columns[8].accessor]: row[8],
      [columns[0].columns[9].accessor]: row[9],
      [columns[0].columns[10].accessor]: row[10],
      [columns[0].columns[11].accessor]: row[11],
      [columns[0].columns[12].accessor]: profit.toFixed(2),
    };
  });
  const graphData: any = {};
  const sortedByDate = fnoData.slice(1).sort((a, b) => {
    var a1 = moment(a[3], 'DD-MM-YYYY');
    var b1 = moment(b[3], 'DD-MM-YYYY');
    if (a1.isBefore(b1)) return -1;
    else if (b1.isBefore(a1)) return 1;
    else return 0;
  });
  sortedByDate.forEach(row => {
    const profit = parseFloat(row[10]) - parseFloat(row[7]);
    const date = moment(row[3], 'DD-MM-YYYY').format('DD MMM YYYY');
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
    <div>
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
      <Table columns={columns} data={data} />
    </div>
  );
}
