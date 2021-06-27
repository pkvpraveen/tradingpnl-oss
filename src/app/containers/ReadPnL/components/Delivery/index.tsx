/**
 *
 * Delivery
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Table } from '../../../../components/Table';
import { ScriptWisePnLGraph } from './ScriptWisePnLGraph';

interface Props {
  deliveryData: any;
}

export function Delivery(props: Props) {
  const { deliveryData } = props;
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
              const charges = deliveryData.charges;
              const netProfit = deliveryData.netPnL;

              return (
                <>
                  Total Realized Profit: {total}, Charges: {charges},Net P&L :{' '}
                  {netProfit}{' '}
                </>
              );
            },
          },
        ],
      },
    ],
    [],
  );
  const data = deliveryData.trades.slice(1).map(row => {
    return {
      [columns[0].columns[0].accessor]: row[0],
      [columns[0].columns[1].accessor]: row[2],
      [columns[0].columns[2].accessor]: row[6],
      [columns[0].columns[3].accessor]: row[8],
      [columns[0].columns[4].accessor]: row[7],
      [columns[0].columns[5].accessor]: row[10],
      [columns[0].columns[6].accessor]: row[12],
      [columns[0].columns[7].accessor]: row[11],
      [columns[0].columns[8].accessor]: row[14],
    };
  });

  return (
    <Div>
      <ScriptWisePnLGraph />
      <Table columns={columns} data={data} />
    </Div>
  );
}

const Div = styled.div``;
