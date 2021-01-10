/**
 *
 * Delivery
 *
 */
import * as React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { Table } from '../../../../components/Table';
import { BarChart } from '../../../../components/BarChart';

interface Props {
  deliveryData: any;
}

export function Delivery(props: Props) {
  const { deliveryData } = props;
  const theme = useTheme();
  const columns = React.useMemo(
    () => [
      {
        Header: 'Delivery',
        Footer: 'Delivery',
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
            Header: 'Realized Profit',
            accessor: 'realizedProfit',
            sortType: (a, b) => {
              var a1 = parseFloat(a.original.realizedProfit);
              var b1 = parseFloat(b.original.realizedProfit);
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
                      (sum, row) => parseFloat(row.values.realizedProfit) + sum,
                      0,
                    )
                    .toFixed(2),
                [info.rows],
              );

              return <>Total Realized Profit: {total}</>;
            },
          },
        ],
      },
    ],
    [],
  );
  const data = deliveryData.slice(1).map(row => {
    const sellQty = parseInt(row[5]);
    const sellAvg = parseFloat(row[6]);
    const buyAvg = parseFloat(row[3]);

    const realizedProfit = sellQty * (sellAvg - buyAvg);
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
      [columns[0].columns[9].accessor]: realizedProfit.toFixed(2),
    };
  });
  const graphData: any = {};
  deliveryData.slice(1).forEach(row => {
    const sellQty = parseInt(row[5]);
    const sellAvg = parseFloat(row[6]);
    const buyAvg = parseFloat(row[3]);
    const realizedProfit = sellQty * (sellAvg - buyAvg);
    const scrip = row[0];
    graphData[scrip] = realizedProfit;
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
    <Div>
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
    </Div>
  );
}

const Div = styled.div``;
