/**
 *
 * ReadPnL
 *
 */

import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file';
import { useTheme } from 'styled-components/macro';
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
import ProfitTrend from './components/TotalPnL/ProfitTrend';
import Content from '../../components/Content';
import { A } from '../../components/A';

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
        <Grid item xs={12}>
          <Content>
            This application does not export any data. All data resides only in
            your browser. Feel free to disconnect internet when you upload your
            pnl if you are in doubt. Don't have your pnl handy but want to try
            out the tool? Download my pnl and try... here is my{' '}
            <A href="./assets/P&L_Report_HJ32423_234343_FO.xlsx" download>
              F&O
            </A>{' '}
            and{' '}
            <A href="./assets/P&L_Report_AF324232333_2182_EQ.xlsx" download>
              Equity
            </A>{' '}
            pnl
          </Content>
          <Content>
            Currently working for Upstox only. Zerodha and Angel coming soon....
          </Content>
        </Grid>
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
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
              <CalendarPnL />
            </Grid>
          </Grid>
          <ProfitByDateRange />
          <ProfitTrend />
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
