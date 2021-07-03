import React from 'react';
import { Table } from '../../../../components/Table';
import { Trade } from '../../types';
interface Props {
  trades: Array<Trade>;
}
export const TradesTable = (props: Props) => {
  const { trades } = props;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Trades',
        Footer: 'Trades',
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

              return <>Total: {total}</>;
            },
          },
        ],
      },
    ],
    [trades],
  );
  const data = trades.map((row: Trade) => {
    return {
      [columns[0].columns[0].accessor]: row.scripName,
      [columns[0].columns[1].accessor]: row.symbol,
      [columns[0].columns[2].accessor]: row.buyQuantity,
      [columns[0].columns[3].accessor]: row.buyRate,
      [columns[0].columns[4].accessor]: row.buyAmount,
      [columns[0].columns[5].accessor]: row.sellQuantity,
      [columns[0].columns[6].accessor]: row.sellRate,
      [columns[0].columns[7].accessor]: row.sellAmount,
      [columns[0].columns[8].accessor]: row.profit,
    };
  });

  return <Table columns={columns} data={data} />;
};
