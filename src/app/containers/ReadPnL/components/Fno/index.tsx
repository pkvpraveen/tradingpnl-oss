/**
 *
 * Fno
 *
 */
import * as React from 'react';
import moment from 'moment';
import { Table } from 'app/components/Table';
import { ExpiryWisePnLGraph } from './ExpiryWisePnLGraph';
import { DateWisePnLGraph } from './DateWisePnLGraph';
import styled from 'styled-components/macro';
import { CalendarPnL } from './CalendarPnL';
import { Trade } from '../../types';

interface Props {
  fnoData: any;
}

export function Fno(props: Props) {
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
            Header: 'Call/Put',
            accessor: 'callPut',
            Footer: ' ',
          },
          {
            Header: 'Buy Date',
            accessor: 'buyDate',
            sortType: (a, b) => {
              const a1 = moment(a.original.buyDate, 'DD-MM-YYYY');
              const b1 = moment(b.original.buyDate, 'DD-MM-YYYY');
              if (a1.isBefore(b1)) return 1;
              else if (b1.isBefore(a1)) return -1;
              else return 0;
            },
            Footer: ' ',
          },
          {
            Header: 'Sell Date',
            accessor: 'sellDate',
            sortType: (a, b) => {
              const a1 = moment(a.original.sellDate, 'DD-MM-YYYY');
              const b1 = moment(b.original.sellDate, 'DD-MM-YYYY');
              if (a1.isBefore(b1)) return 1;
              else if (b1.isBefore(a1)) return -1;
              else return 0;
            },
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
            Header: 'P&L',
            accessor: 'pnl',
            sortType: (a, b) => {
              const a1 = a.original.pnl;
              const b1 = b.original.pnl;
              if (a1 < b1) return 1;
              else if (b1 < a1) return -1;
              else return 0;
            },
            Footer: info => {
              // Only calculate total visits if rows change
              const total = React.useMemo(
                () =>
                  info.rows
                    .reduce((sum, row) => parseFloat(row.values.pnl) + sum, 0)
                    .toFixed(2),
                [info.rows],
              );
              const charges = fnoData.charges;
              const netPnl = fnoData.netPnL;

              return (
                <>
                  Total PnL: {total} | Charges: {charges} | Net PnL: {netPnl}
                </>
              );
            },
          },
        ],
      },
    ],
    [fnoData.charges, fnoData.netPnL],
  );
  const data = fnoData.trades.map((row: Trade) => {
    return {
      [columns[0].columns[0].accessor]: row.scripName,
      [columns[0].columns[1].accessor]: row.scriptOpt,
      [columns[0].columns[2].accessor]: row.buyDate,
      [columns[0].columns[3].accessor]: row.sellDate,
      [columns[0].columns[4].accessor]: row.buyQuantity,
      [columns[0].columns[5].accessor]: row.buyRate,
      [columns[0].columns[6].accessor]: row.buyAmount,
      [columns[0].columns[7].accessor]: row.sellQuantity,
      [columns[0].columns[8].accessor]: row.sellRate,
      [columns[0].columns[9].accessor]: row.sellAmount,
      [columns[0].columns[10].accessor]: row.profit,
    };
  });

  return (
    <Div>
      <DateWisePnLGraph />
      <ExpiryWisePnLGraph />
      <Table columns={columns} data={data} />
    </Div>
  );
}

const Div = styled.div`
  min-width: 1500px;
  margin: 0 auto;
`;
