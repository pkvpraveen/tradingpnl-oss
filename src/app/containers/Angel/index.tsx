import React from 'react';
import { UploadFiles } from './UpoadFiles';
import { Box, Grid } from '@material-ui/core';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { sliceKey, reducer } from './slice';
import { Equity } from './Equity';
import { FnO } from './FnO';
import { useSelector } from 'react-redux';
import {
  selectAngelEQResidue,
  selectAngelEQTrades,
  selectAngelFnOTrades,
} from './selectors';
import { TotalPnL } from './TotalPnL';
import { ProfitByDateRange } from './ProfitByDateRange';
import ProfitTrend from './ProfitTrend';
import { Residue } from './Equity/Residue';
import { TradesTable } from './TradesTable';
import { CalendarPnL } from './CalendarPnL';

export default function Angel() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const eqTrades = useSelector(selectAngelEQTrades);
  const fnoTrades = useSelector(selectAngelFnOTrades);
  const eqResidue = useSelector(selectAngelEQResidue);
  const anyExist = fnoTrades.length > 0 || eqTrades.length > 0;
  return (
    <Box mt={3}>
      <UploadFiles />
      {anyExist && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TotalPnL />
          </Grid>
          <Grid item xs={12}>
            <CalendarPnL />
          </Grid>
          <Grid item xs={12}>
            <ProfitByDateRange />
          </Grid>
          <Grid item xs={12}>
            <ProfitTrend />
          </Grid>
        </Grid>
      )}

      {eqResidue.length > 0 && <Residue />}
      {fnoTrades.length > 0 && <FnO />}
      {fnoTrades.length > 0 && (
        <TradesTable title={'FnO Trades Table'} trades={fnoTrades} />
      )}
      {eqTrades.length > 0 && <Equity />}
      {eqTrades.length > 0 && (
        <TradesTable title={'Equity Trades Table'} trades={eqTrades} />
      )}
    </Box>
  );
}
