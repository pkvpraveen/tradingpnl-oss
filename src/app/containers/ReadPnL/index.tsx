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
import { readPnLSaga } from './saga';
import {
  selectDeliveryData,
  selectFnOData,
  selectIntradayData,
} from './selectors';
import { readPnLActions, reducer, sliceKey } from './slice';
import { Delivery } from './components/Delivery';
import { TotalPnL } from './components/TotalPnL';

interface Props {}

export const ReadPnL = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: readPnLSaga });
  const theme = useTheme();

  const dispatch = useDispatch();

  function getEQFile(event) {
    readXlsxFile(event.target.files[0]).then(rows => {
      dispatch(readPnLActions.loadEQData(rows));
    });
  }

  function getFnOFile(event) {
    readXlsxFile(event.target.files[0]).then(rows => {
      dispatch(readPnLActions.loadFnOData(rows));
    });
  }

  const intradayData = useSelector(selectIntradayData);
  const fnoData = useSelector(selectFnOData);
  const deliveryData = useSelector(selectDeliveryData);

  return (
    <>
      <InputContainer>
        <FormGroup onSubmit={() => {}}>
          <FormLabel>Upload Equity P&L Excel file</FormLabel>
          <InputWrapper>
            <Input
              type="file"
              placeholder="upload Equity PnL"
              onChange={getEQFile}
            />
          </InputWrapper>
        </FormGroup>
        <FormGroup onSubmit={() => {}}>
          <FormLabel>Upload F&O P&l Excel file</FormLabel>
          <InputWrapper>
            <Input
              type="file"
              placeholder="upload F&O PnL"
              onChange={getFnOFile}
            />
          </InputWrapper>
        </FormGroup>
      </InputContainer>
      {((deliveryData && deliveryData?.trades.length > 0) ||
        (fnoData && fnoData.trades.length > 0) ||
        intradayData.length > 0) && (
        <>
          <Title as="h2">Summary</Title>
          <h3 style={{ color: theme.text }}>{`Total Profit ₹${(
            (deliveryData?.netPnL || 0) + (fnoData?.netPnL || 0)
          ).toFixed(2)}`}</h3>
          <TotalPnL />
        </>
      )}
      {fnoData && fnoData.trades.length > 0 && (
        <>
          <Title as="h2">FnO</Title>
          <h3
            style={{ color: theme.text }}
          >{`Total Profit ₹${fnoData.netPnL}`}</h3>
          <Fno fnoData={fnoData} />
        </>
      )}
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

const FormGroup = styled.form`
  width: 50%;
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
const InputContainer = styled.div`
  display: flex;
`;
