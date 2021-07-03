import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'; // if using DnD
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectDeliveryData, selectFnOData } from '../../selectors';
import { Trade } from '../../types';
import styled from 'styled-components/macro';
import Dialog from 'react-dialog';
import 'react-dialog/css/index.css';
import { TradesTable } from './TradesTable';

const localizer = momentLocalizer(moment);

function getDate(row: Trade) {
  const buyDate = moment(row.buyDate, 'DD-MM-YYYY');
  const sellDate = moment(row.sellDate, 'DD-MM-YYYY');
  return buyDate.isAfter(sellDate) ? buyDate : sellDate;
}

function eventStyleGetter(event, start, end, isSelected) {
  var backgroundColor = event.value > 0 ? 'green' : 'red';
  var style = {
    backgroundColor: backgroundColor,
  };
  return {
    style: style,
  };
}
function mergeTrades(fno, delivery) {
  if (fno && delivery) {
    return [...fno, ...delivery];
  } else if (fno) {
    return fno;
  } else {
    return delivery;
  }
}

export const CalendarPnL = () => {
  const fnoData = useSelector(selectFnOData);
  const deliveryData = useSelector(selectDeliveryData);
  const [open, setOpen] = useState(false);
  const [trades, setTrades] = useState<Array<Trade>>([]);
  const graphData: any = {};
  function handleClose() {
    setOpen(false);
  }
  const wholeTrades = mergeTrades(fnoData?.trades, deliveryData?.trades);
  wholeTrades?.forEach(row => {
    const profit = row.profit;
    const date = getDate(row).format('DD MMM YYYY');
    if (!graphData[date]) {
      graphData[date] = { rows: [row], profit };
    } else {
      graphData[date].profit += profit;
      graphData[date].rows.push(row);
    }
  });
  function onEventClick(event) {
    console.log(event.rows);
    setTrades(event.rows);
    setOpen(true);
  }
  const events = Object.keys(graphData).map((date, index) => ({
    id: index,
    title: `${graphData[date].profit.toFixed(2)}`,
    value: graphData[date].profit,
    rows: graphData[date].rows,
    start: moment(date, 'DD MMM YYYY').toDate(),
    end: moment(date, 'DD MMM YYYY').toDate(),
  }));
  return (
    <Div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        max={moment()}
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={onEventClick}
      />
      {open && (
        <Dialog
          title={`Trades on ${moment(getDate(trades[0])).format(
            'DD MMM YYYY',
          )}`}
          modal={true}
          onClose={handleClose}
          height="auto"
          width="auto"
        >
          <DialogContents>
            <TradesTable trades={trades} />
          </DialogContents>
        </Dialog>
      )}
    </Div>
  );
};

const Div = styled.div`
  margin: 3rem 0;
  width: 50%;
`;
const DialogContents = styled.div`
  margin: 0 0;
  overflow-y: 'auto';
  max-height: 60vh;
  width: 100%;
`;
