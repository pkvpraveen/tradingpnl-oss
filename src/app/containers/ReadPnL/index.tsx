/**
 *
 * ReadPnL
 *
 */

import { FormLabel } from 'app/components/FormLabel';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file';
import styled, { useTheme } from 'styled-components/macro';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Title } from '../HomePage/components/Title';
import { Fno } from './components/Fno';
import { Input } from './components/Input';
import { Intraday } from './components/Intraday';
import { readPnLSaga } from './saga';
import { selectDeliveryData, selectFnOData, selectIntradayData } from './selectors';
import { readPnLActions, reducer, sliceKey } from './slice';
import { Delivery } from './components/Delivery';
import { TotalPnL } from './components/TotalPnL';

interface Props {}

export const ReadPnL = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: readPnLSaga });
  const theme = useTheme();

  const dispatch = useDispatch();

  function getFile(event) {
    readXlsxFile(event.target.files[0]).then(rows => {
      dispatch(readPnLActions.loadIntradayData(rows));
    });
    readXlsxFile(event.target.files[0], { sheet: 2 }).then(rows => {
      dispatch(readPnLActions.loadFnOData(rows));
    });
  }

  function calculateTotalDeliveryProfit(deliveryData) {
    let totalProfit = 0;
    deliveryData.slice(1).forEach((row: Array<string>) => {
      const sellQty = parseInt(row[5]);
      const sellAvg = parseFloat(row[6]);
      const buyAvg = parseFloat(row[3]);

      const realizedProfit = sellQty * (sellAvg - buyAvg);
      totalProfit += realizedProfit;
    });
    return totalProfit.toFixed(2);
  }

  function calculateTotalIntradayProfit(deliveryData) {
    let totalProfit = 0;
    deliveryData.slice(1).forEach((row: Array<string>) => {
      const profit = parseFloat(row[8]) - parseFloat(row[5]);
      totalProfit += profit;
    });
    return totalProfit.toFixed(2);
  }

  function calculateTotalFnOProfit(deliveryData) {
    let totalProfit = 0;
    deliveryData.slice(1).forEach((row: Array<string>) => {
      const profit = parseFloat(row[10]) - parseFloat(row[7]);
      totalProfit += profit;
    });
    return totalProfit.toFixed(2);
  }

  const intradayData = useSelector(selectIntradayData);
  const fnoData = useSelector(selectFnOData);
  const deliveryData = useSelector(selectDeliveryData);
  const totalProfitDelivery = calculateTotalDeliveryProfit(deliveryData);
  const totalProfitFnO = calculateTotalFnOProfit(fnoData);
  const toalProfitIntraday = calculateTotalIntradayProfit(intradayData);

  return (
    <>
      <FormGroup onSubmit={() => {}}>
        <FormLabel>Select file</FormLabel>
        <InputWrapper>
          <Input type="file" placeholder="upload PnL" onChange={getFile} />
        </InputWrapper>
      </FormGroup>
      {(deliveryData.length > 0 ||
        fnoData.length > 0 ||
        intradayData.length > 0) && (
        <>
          <Title as="h2">Summary</Title>
          <h3 style={{ color: theme.text }}>{`Total Profit ₹${(
            parseFloat(totalProfitDelivery) +
            parseFloat(totalProfitFnO) +
            parseFloat(toalProfitIntraday)
          ).toFixed(2)}`}</h3>
          <TotalPnL
            delivery={parseFloat(totalProfitDelivery)}
            fno={parseFloat(totalProfitFnO)}
            intraday={parseFloat(toalProfitIntraday)}
          />
        </>
      )}
      {deliveryData.length > 0 && (
        <>
          <Title as="h2">Delivery</Title>
          <h3
            style={{ color: theme.text }}
          >{`Total Profit ₹${totalProfitDelivery}`}</h3>
          <Delivery deliveryData={deliveryData} />
        </>
      )}
      {fnoData.length > 0 && (
        <>
          <Title as="h2">FnO</Title>
          <h3
            style={{ color: theme.text }}
          >{`Total Profit ₹${totalProfitFnO}`}</h3>
          <Fno fnoData={fnoData} />
        </>
      )}
      {intradayData.length > 0 && (
        <>
          <Title as="h2">Intraday</Title>
          <h3
            style={{ color: theme.text }}
          >{`Total Profit ₹${toalProfitIntraday}`}</h3>
          <Intraday intradayData={intradayData} />
        </>
      )}
    </>
  );
});

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Input} {
    width: ${100 / 3}%;
    margin-right: 0.5rem;
  }
`;
