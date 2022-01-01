import React from 'react';
import { Table } from '../../../components/Table';
import { Trade } from '../types';
import moment from 'moment';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export const TradesTable = ({
  title,
  trades,
  expanded = false,
}: {
  title: string;
  trades: Array<Trade>;
  expanded?: boolean;
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Trades',
        Footer: 'Trades',
        columns: [
          {
            Header: 'Scrip Name',
            accessor: 'symbol',
            Footer: ' ',
          },
          {
            Header: 'Buy Date',
            accessor: 'buyDate',
            Footer: ' ',
          },
          {
            Header: 'Buy Qty',
            accessor: 'buyQuantity',
            Footer: ' ',
          },
          {
            Header: 'Buy Avg',
            accessor: 'buyPrice',
            Footer: ' ',
          },
          {
            Header: 'Buy Amt',
            accessor: 'buyAmt',
            Footer: ' ',
          },
          {
            Header: 'Sell Date',
            accessor: 'sellDate',
            Footer: ' ',
          },
          {
            Header: 'Sell Qty',
            accessor: 'sellQuantity',
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
    [],
  );
  const data = trades.map((row: Trade) => {
    return {
      [columns[0].columns[0].accessor]: row.symbol,
      [columns[0].columns[1].accessor]: moment(row.buyDate).format(
        'DD-MMM-YYYY',
      ),
      [columns[0].columns[2].accessor]: row.buyQuantity,
      [columns[0].columns[3].accessor]: row.buyPrice,
      [columns[0].columns[4].accessor]: (row.buyPrice * row.buyPrice).toFixed(
        2,
      ),
      [columns[0].columns[5].accessor]: moment(row.sellDate).format(
        'DD-MMM-YYYY',
      ),
      [columns[0].columns[6].accessor]: row.sellQuantity,
      [columns[0].columns[7].accessor]: row.sellPrice,
      [columns[0].columns[8].accessor]: (row.buyPrice * row.buyPrice).toFixed(
        2,
      ),
      [columns[0].columns[9].accessor]: row.profit.toFixed(2),
    };
  });

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        style={{ width: '100%', padding: '0 1rem' }}
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>
        <Table columns={columns} data={data} />
      </AccordionDetails>
    </Accordion>
  );
};
