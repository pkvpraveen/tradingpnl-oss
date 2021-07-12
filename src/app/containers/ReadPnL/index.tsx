/**
 *
 * ReadPnL
 *
 */

import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file';
import styled, { useTheme } from 'styled-components/macro';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Title } from '../HomePage/components/Title';
import { Fno } from './components/Fno';
import { readPnLSaga } from './saga';
import { selectDeliveryData, selectFnOData } from './selectors';
import { readPnLActions, reducer, sliceKey } from './slice';
import { Delivery } from './components/Delivery';
import { TotalPnL } from './components/TotalPnL';
import { CalendarPnL } from './components/Fno/CalendarPnL';
import { Box, Grid } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { ProfitByDateRange } from './components/ProfitByDateRange';

interface Props {}
function getColor(v) {
  return parseFloat(v) > 0 ? 'rgba(11, 156, 49, 0.7)' : 'rgba(255, 0, 0, 0.7)';
}
export const ReadPnL = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: readPnLSaga });
  const theme = useTheme();

  const dispatch = useDispatch();

  function getEQFile(files) {
    readXlsxFile(files[0]).then(rows => {
      dispatch(readPnLActions.loadEQData(rows));
    });
  }

  function getFnOFile(files) {
    readXlsxFile(files[0]).then(rows => {
      dispatch(readPnLActions.loadFnOData(rows));
    });
  }

  const fnoData = useSelector(selectFnOData);
  const deliveryData = useSelector(selectDeliveryData);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DropzoneArea
            onChange={getEQFile}
            acceptedFiles={[
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ]}
            filesLimit={1}
            useChipsForPreview
            dropzoneText="Upload Equity P&L excel"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneArea
            onChange={getFnOFile}
            filesLimit={1}
            acceptedFiles={[
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ]}
            useChipsForPreview
            dropzoneText="Upload F&O P&L excel"
          />
        </Grid>
      </Grid>
      {((deliveryData && deliveryData?.trades.length > 0) ||
        (fnoData && fnoData.trades.length > 0)) && (
        <>
          <Flex>
            <Summary>
              <Title as="h2">Summary</Title>
              <Box display="flex">
                <h3
                  style={{
                    color: theme.textSecondary,
                  }}
                >
                  Total Profit
                </h3>
                <h3
                  style={{
                    color: getColor(
                      (deliveryData?.netPnL || 0) + (fnoData?.netPnL || 0),
                    ),
                    marginLeft: 10,
                  }}
                >{`₹${(
                  (deliveryData?.netPnL || 0) + (fnoData?.netPnL || 0)
                ).toFixed(2)}`}</h3>
                {fnoData && (
                  <>
                    <h3
                      style={{
                        color: theme.textSecondary,
                        marginLeft: 20,
                      }}
                    >
                      FnO
                    </h3>
                    <h3
                      style={{
                        color: getColor(fnoData.netPnL),
                        marginLeft: 10,
                      }}
                    >{` ₹${fnoData.netPnL}`}</h3>
                  </>
                )}
                {deliveryData && (
                  <>
                    <h3
                      style={{
                        color: theme.textSecondary,
                        marginLeft: 20,
                      }}
                    >
                      Equity
                    </h3>
                    <h3
                      style={{
                        color: getColor(deliveryData.netPnL),
                        marginLeft: 10,
                      }}
                    >{`₹${deliveryData.netPnL}`}</h3>
                  </>
                )}
              </Box>
              <TotalPnL />
            </Summary>
            <CalendarPnL />
          </Flex>
          <ProfitByDateRange />
        </>
      )}
      {fnoData && fnoData.trades.length > 0 && <Fno fnoData={fnoData} />}
      {deliveryData && deliveryData.trades.length > 0 && (
        <>
          <Title as="h2">Delivery</Title>
          <h3
            style={{ color: theme.text }}
          >{`Total Profit ₹${deliveryData.netPnL}`}</h3>
          <Delivery deliveryData={deliveryData} />
        </>
      )}
    </>
  );
});

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Summary = styled.div`
  width: 50%;
`;
