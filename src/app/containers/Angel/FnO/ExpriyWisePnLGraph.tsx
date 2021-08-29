import React from 'react';
import { useSelector } from 'react-redux';
import { selectAngelFnOTrades } from '../selectors';
import { FnOTrade } from '../types';
import { BarGraph } from '../../../components/BarGraph';
import { Box, Divider } from '@material-ui/core';
import { Title } from '../../../components/Title';

export function ExpiryWisePnLGraph() {
  const trades = useSelector(selectAngelFnOTrades);
  const graphData: any = {};
  if (trades) {
    trades.forEach((row: FnOTrade) => {
      const scrip = row.expiry;
      graphData[scrip] = graphData[scrip]
        ? graphData[scrip] + row.profit
        : row.profit;
    });
  }
  return (
    <Box mt={2}>
      <Divider />
      <Title as="h2">Expiry Wise PnL</Title>
      <BarGraph graphData={graphData} />
    </Box>
  );
}
