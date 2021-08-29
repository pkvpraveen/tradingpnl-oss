import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUpstoxFnOData } from '../../selectors';
import { Trade } from '../../types';
import { DateWisePnLGraphView } from '../../../../components/DateWisePnLGraphView';

export function DateWisePnLGraph() {
  const fnoData = useSelector(selectUpstoxFnOData);

  function getDate(row: Trade) {
    const buyDate = moment(row.buyDate, 'DD-MM-YYYY');
    const sellDate = moment(row.sellDate, 'DD-MM-YYYY');
    return buyDate.isAfter(sellDate) ? buyDate : sellDate;
  }

  return <DateWisePnLGraphView trades={fnoData?.trades} getDate={getDate} />;
}
