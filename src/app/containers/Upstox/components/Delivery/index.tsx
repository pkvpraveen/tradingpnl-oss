/**
 *
 * Delivery
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Table } from '../../../../components/Table';
import { ScriptWisePnLGraph } from './ScriptWisePnLGraph';
import { Trade } from '../../types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

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
    [deliveryData.charges, deliveryData.netPnL],
  );
  const data = deliveryData.trades.map((row: Trade) => {
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

  return (
    <Div>
      <ScriptWisePnLGraph />
      <Accordion>
        <AccordionSummary
          style={{ width: '100%', padding: '0 1rem' }}
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          P&L Table
        </AccordionSummary>
        <AccordionDetails>
          <Table columns={columns} data={data} />
        </AccordionDetails>
      </Accordion>
    </Div>
  );
}

const Div = styled.div``;
