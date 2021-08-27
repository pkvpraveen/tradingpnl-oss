/**
 *
 * ReadPnL
 *
 */

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/macro';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Title } from '../HomePage/components/Title';
import { Fno } from './components/Fno';
import { readPnLSaga } from './saga';
import { selectUpstoxDeliveryData, selectUpstoxFnOData } from './selectors';
import { reducer, sliceKey } from './slice';
import { Delivery } from './components/Delivery';
import { TotalPnL } from './components/TotalPnL';
import { CalendarPnL } from './components/Fno/CalendarPnL';
import { Grid } from '@material-ui/core';
import { ProfitByDateRange } from './components/ProfitByDateRange';
import ProfitTrend from './components/TotalPnL/ProfitTrend';
import Content from '../../components/Content';
import { A } from '../../components/A';
import { UploadFiles } from './components/UploadFiles';

interface Props {}

function getColor(v) {
  return parseFloat(v) > 0 ? 'rgba(11, 156, 49, 0.7)' : 'rgba(255, 0, 0, 0.7)';
}

export const ReadPnL = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: readPnLSaga });
  const theme = useTheme();

  const fnoData = useSelector(selectUpstoxFnOData);
  const deliveryData = useSelector(selectUpstoxDeliveryData);

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
            Currently working for Upstox and Angel only. Zerodha coming soon....
          </Content>
        </Grid>
        <UploadFiles />
      </Grid>
      {((deliveryData && deliveryData?.trades.length > 0) ||
        (fnoData && fnoData.trades.length > 0)) && (
        <>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
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
