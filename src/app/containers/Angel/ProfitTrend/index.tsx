import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import ProfitTrendView from '../../../components/ProfitTrendView';
import { selectAngelEQTrades, selectAngelFnOTrades } from '../selectors';

function getDate(row) {
  return moment(row.profitDate);
}

const ProfitTrend = () => {
  const fnOTrades = useSelector(selectAngelFnOTrades);
  const eqTrades = useSelector(selectAngelEQTrades);

  return (
    <ProfitTrendView
      fnoTrades={fnOTrades || []}
      eqTrades={eqTrades || []}
      getDate={getDate}
    />
  );
};

export default ProfitTrend;
