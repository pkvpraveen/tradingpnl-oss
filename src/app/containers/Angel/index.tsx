import React from 'react';
import { UploadFiles } from './UpoadFiles';
import { Box } from '@material-ui/core';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { sliceKey, reducer } from './slice';
import { Equity } from './Equity';
import { FnO } from './FnO';
import { useSelector } from 'react-redux';
import { selectAngelEQTrades, selectAngelFnOTrades } from './selectors';

export default function Angel() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const eqTrades = useSelector(selectAngelEQTrades);
  const fnoTrades = useSelector(selectAngelFnOTrades);
  return (
    <Box mt={3}>
      <UploadFiles />
      {fnoTrades.length > 0 && <FnO />}
      {eqTrades.length > 0 && <Equity />}
    </Box>
  );
}
