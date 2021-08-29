import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useSelector } from 'react-redux';
import { selectUpstoxDeliveryData, selectUpstoxFnOData } from '../selectors';
import { Trade } from '../types';
import moment from 'moment';
import { ProfitByDateRangeView } from '../../../components/ProfitByDateRangeView';

function getDate(row: Trade) {
  const buyDate = moment(row.buyDate, 'DD-MM-YYYY');
  const sellDate = moment(row.sellDate, 'DD-MM-YYYY');
  return buyDate.isAfter(sellDate) ? buyDate : sellDate;
}

export const ProfitByDateRange = () => {
  const fnoData = useSelector(selectUpstoxFnOData);
  const deliveryData = useSelector(selectUpstoxDeliveryData);
  return (
    <ProfitByDateRangeView
      eqTrades={deliveryData?.trades}
      fnoTrades={fnoData?.trades}
      getDateFromTrade={getDate}
    />
  );
};
