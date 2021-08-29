import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { DateWisePnLGraphView } from '../../../components/DateWisePnLGraphView';
import { selectAngelFnOTrades } from '../selectors';

export function DateWisePnLGraph() {
  const fnOTrades = useSelector(selectAngelFnOTrades);

  function getDate(row) {
    return moment(row.profitDate);
  }

  return <DateWisePnLGraphView trades={fnOTrades} getDate={getDate} />;
}
