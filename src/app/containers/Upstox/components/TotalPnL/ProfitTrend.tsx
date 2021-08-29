import React from 'react';
import { Trade } from '../../types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUpstoxDeliveryData, selectUpstoxFnOData } from '../../selectors';
import ProfitTrendView from '../../../../components/ProfitTrendView';

function getDate(row: Trade) {
  const buyDate = moment(row.buyDate, 'DD-MM-YYYY');
  const sellDate = moment(row.sellDate, 'DD-MM-YYYY');
  return buyDate.isAfter(sellDate) ? buyDate : sellDate;
}

const ProfitTrend = () => {
  const fnoData = useSelector(selectUpstoxFnOData);
  const deliveryData = useSelector(selectUpstoxDeliveryData);

  return (
    <ProfitTrendView
      fnoTrades={fnoData?.trades || []}
      eqTrades={deliveryData?.trades || []}
      getDate={getDate}
    />
  );
};

export default ProfitTrend;
