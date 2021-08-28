import React from 'react';
import { UploadFiles } from './UpoadFiles';
import { Box, Grid } from '@material-ui/core';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { sliceKey, reducer } from './slice';
import { Equity } from './Equity';
import { FnO } from './FnO';
import { useSelector } from 'react-redux';
import { selectAngelEQTrades, selectAngelFnOTrades } from './selectors';
import { TotalPnL } from './TotalPnL';

export default function Angel() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const eqTrades = useSelector(selectAngelEQTrades);
  const fnoTrades = useSelector(selectAngelFnOTrades);
  return (
    <Box mt={3}>
      <UploadFiles />
      <Grid container spacing={2}>
        {(fnoTrades.length > 0 || eqTrades.length > 0) && (
          <Grid item xs={12} md={8}>
            <TotalPnL />
          </Grid>
        )}
      </Grid>
      {fnoTrades.length > 0 && <FnO />}
      {eqTrades.length > 0 && <Equity />}
    </Box>
  );
}
