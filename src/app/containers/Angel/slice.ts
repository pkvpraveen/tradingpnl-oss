import { createSlice } from '../../../utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import moment from 'moment';

export const initialState: ContainerState = {
  eqTrades: [],
  fnoTrades: [],
  eqCharges: 0,
  fnoCharges: 0,
};

const angelSlice = createSlice({
  name: 'angel',
  initialState,
  reducers: {
    loadEQData: (state, action) => {
      const { trades, map } = transformEquityData(action.payload);
      state.eqTrades = trades;
      state.eqResidue = map;
      state.eqCharges = getTotalCharges(action.payload);
    },
    loadFnOData: (state, action) => {
      const { trades, map } = transformFnoData(action.payload);
      state.fnoTrades = trades;
      state.fnoResidue = map;
      state.fnoCharges = getTotalCharges(action.payload);
    },
  },
});
function getTotalCharges(rows) {
  const total = rows.reduce(
    (sum, row) => sum + row.Brokerage + row['Other Charges'],
    0,
  );
  return total;
}
function getDate(buy, sell) {
  const buyDate = moment(buy);
  const sellDate = moment(sell);
  return (buyDate.isAfter(sellDate) ? buyDate : sellDate).toDate();
}
function createEQTrade(
  symbol,
  buyDate,
  buyQuantity,
  buyPrice,
  sellDate,
  sellQuantity,
  sellPrice,
) {
  return {
    symbol,
    buyDate,
    buyQuantity,
    buyPrice,
    sellDate,
    sellQuantity,
    sellPrice,
    profit: (sellPrice - buyPrice) * buyQuantity,
    profitDate: getDate(buyDate, sellDate),
  };
}

function createFnOTrade(
  symbol,
  expiry,
  option,
  strike,
  buyDate,
  buyQuantity,
  buyPrice,
  sellDate,
  sellQuantity,
  sellPrice,
) {
  return {
    symbol,
    expiry,
    option,
    strike,
    buyDate,
    buyQuantity,
    buyPrice,
    sellDate,
    sellQuantity,
    sellPrice,
    profit: (sellPrice - buyPrice) * buyQuantity,
    profitDate: getDate(buyDate, sellDate),
  };
}
function segregateByCompanies(rows) {
  const map = {};
  rows.forEach(row => {
    if (!map[row['Company Name']]) {
      map[row['Company Name']] = {
        buys: [],
        sells: [],
      };
    }
    const company = map[row['Company Name']];
    if (row.Type === 'Buy') {
      company.buys.push(row);
    } else {
      company.sells.push(row);
    }
  });
  return map;
}
function segregateByStrikes(rows) {
  const map = {};
  rows.forEach(row => {
    const key =
      row.Symbol + row['Expiry Date'] + row['Strike Price'] + row.Option;
    if (!map[key]) {
      map[key] = {
        buys: [],
        sells: [],
      };
    }
    const strike = map[key];
    if (row.Type === 'Buy') {
      strike.buys.push(row);
    } else {
      strike.sells.push(row);
    }
  });
  return map;
}
function sortByDate(rows) {
  return rows
    .slice()
    .map(row => ({
      ...row,
      Date: moment(row.Date.trim(), 'DD-MMM-YYYY').toDate(),
    }))
    .sort((a, b) => {
      const a1 = moment(a.Date);
      const b1 = moment(b.Date);
      if (a1.isBefore(b1)) return -1;
      else if (b1.isBefore(a1)) return 1;
      else return 0;
    });
}

export function transformEquityData(rows) {
  const trades: Array<any> = [];
  const sortedByDate = sortByDate(rows);
  const map = segregateByCompanies(sortedByDate);
  Object.keys(map).forEach(key => {
    const { buys, sells } = map[key];
    while (buys.length !== 0 && sells.length !== 0) {
      if (buys[0]['Qty'] === sells[0]['Qty']) {
        const buy = buys.shift();
        const sell = sells.shift();
        const trade = createEQTrade(
          key,
          buy.Date,
          buy.Qty,
          buy.Price,
          sell.Date,
          sell.Qty,
          sell.Price,
        );

        trades.push(trade);
      } else if (buys[0]['Qty'] < sells[0]['Qty']) {
        const buy = buys.shift();
        const sell = sells[0];
        const trade = createEQTrade(
          key,
          buy.Date,
          buy.Qty,
          buy.Price,
          sell.Date,
          buy.Qty,
          sell.Price,
        );
        trades.push(trade);
        sells[0].Qty = sell.Qty - buy.Qty;
      } else {
        const sell = sells.shift();
        const buy = buys[0];
        const trade = createEQTrade(
          key,
          buy.Date,
          sell.Qty,
          buy.Price,
          sell.Date,
          sell.Qty,
          sell.Price,
        );
        trades.push(trade);
        buys[0].Qty = buy.Qty - sell.Qty;
      }
    }
  });
  return { trades, map };
}
export function transformFnoData(rows) {
  const trades: Array<any> = [];
  const sortedByDate = sortByDate(rows);
  const map = segregateByStrikes(sortedByDate);
  Object.keys(map).forEach(key => {
    const { buys, sells } = map[key];
    while (buys.length !== 0 && sells.length !== 0) {
      if (buys[0]['Qty'] === sells[0]['Qty']) {
        const buy = buys.shift();
        const sell = sells.shift();
        const trade = createFnOTrade(
          key,
          buy['Expiry Date'],
          buy.Option,
          buy['Strike Price'],
          buy.Date,
          buy.Qty,
          buy.Price,
          sell.Date,
          sell.Qty,
          sell.Price,
        );
        trades.push(trade);
      } else if (buys[0]['Qty'] < sells[0]['Qty']) {
        const buy = buys.shift();
        const sell = sells[0];
        const trade = createFnOTrade(
          key,
          buy['Expiry Date'],
          buy.Option,
          buy['Strike Price'],
          buy.Date,
          buy.Qty,
          buy.Price,
          sell.Date,
          buy.Qty,
          sell.Price,
        );
        trades.push(trade);
        sells[0].Qty = sell.Qty - buy.Qty;
      } else {
        const sell = sells.shift();
        const buy = buys[0];
        const trade = createFnOTrade(
          key,
          buy['Expiry Date'],
          buy.Option,
          buy['Strike Price'],
          buy.Date,
          sell.Qty,
          buy.Price,
          sell.Date,
          sell.Qty,
          sell.Price,
        );
        trades.push(trade);
        buys[0].Qty = buy.Qty - sell.Qty;
      }
    }
  });
  return { trades, map };
}

export const { actions: angelActions, reducer, name: sliceKey } = angelSlice;
