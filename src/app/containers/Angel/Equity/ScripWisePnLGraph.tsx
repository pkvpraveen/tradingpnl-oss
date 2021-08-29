import React from 'react';
import { useSelector } from 'react-redux';
import { selectAngelEQTrades } from '../selectors';
import { EQTrade } from '../types';
import { BarGraph } from '../../../components/BarGraph';
import { Title } from '../../../components/Title';
import { Box, Divider } from '@material-ui/core';

export function ScriptWisePnLGraph() {
  const trades = useSelector(selectAngelEQTrades);
  const graphData: any = {};
  if (trades) {
    trades.forEach((row: EQTrade) => {
      const scrip = row.symbol;
      graphData[scrip] = graphData[scrip]
        ? graphData[scrip] + row.profit
        : row.profit;
    });
  }
  return (
    <Box mt={2}>
      <Divider />
      <Title as="h2">Scrip Wise PnL</Title>
      <BarGraph graphData={graphData} />
    </Box>
  );
}
