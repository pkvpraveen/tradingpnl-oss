import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useSelector } from 'react-redux';
import { selectAngelEQTrades, selectAngelFnOTrades } from '../selectors';
import { ProfitByDateRangeView } from '../../../components/ProfitByDateRangeView';
import moment from 'moment';

function getDate(row) {
  return moment(row.profitDate);
}

export const ProfitByDateRange = () => {
  const fnoTrades = useSelector(selectAngelFnOTrades);
  const eqTrades = useSelector(selectAngelEQTrades);
  return (
    <ProfitByDateRangeView
      eqTrades={eqTrades}
      fnoTrades={fnoTrades}
      getDateFromTrade={getDate}
    />
  );
};
