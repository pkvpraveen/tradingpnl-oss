import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from '@material-ui/core';
import { Title } from '../Title';

function getColor(v) {
  return v > 0 ? 'rgba(11, 156, 49, 0.7)' : 'rgba(255, 0, 0, 0.7)';
}

export const ProfitByDateRangeView = ({
  eqTrades,
  fnoTrades,
  getDateFromTrade,
}) => {
  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [showFno, setShowFno] = useState(true);
  const [showEq, setShowEq] = useState(true);
  const [capital, setCapital] = useState('');
  const [charges, setCharges] = useState('');
  const startDate = state[0].startDate;
  const endDate = state[0].endDate;
  const selectedFno = fnoTrades?.filter(trade =>
    getDateFromTrade(trade).isBetween(startDate, endDate, 'day', '[]'),
  );
  const selectedEq = eqTrades?.filter(trade =>
    getDateFromTrade(trade).isBetween(startDate, endDate, 'day', '[]'),
  );
  let sum = 0;
  if (showFno) {
    selectedFno?.forEach(trade => {
      sum += trade.profit;
    });
  }
  if (showEq) {
    selectedEq?.forEach(trade => {
      sum += trade.profit;
    });
  }
  const validCapital = parseFloat(capital);
  const validCharges = parseFloat(charges || '0.0');
  sum -= validCharges;
  const percentage = validCapital > 0 ? (sum * 100) / validCapital : 0;
  return (
    <>
      <Divider />
      <Box mt={1}>
        <Title as="h2">See Profit for a date range</Title>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <DateRangePicker
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              direction="horizontal"
              ranges={state}
              onChange={item => setState([item.selection])}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Box
              display={'flex'}
              justifyContent={'space-around'}
              alignItems={'flex-start'}
              p={1}
              style={{ backgroundColor: '#fff', borderRadius: 10 }}
            >
              <TextField
                label="Capital"
                variant="outlined"
                size="small"
                type={'number'}
                style={{ width: 150 }}
                value={capital}
                onChange={e => setCapital(e.target.value)}
              />
              <TextField
                label="Charges"
                variant="outlined"
                size="small"
                type={'number'}
                helperText={'Charges to reduce from profit'}
                value={charges}
                onChange={e => setCharges(e.target.value)}
              />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showFno}
                      onChange={event => setShowFno(event.target.checked)}
                      name="fno"
                      color="primary"
                    />
                  }
                  label="Include FnO"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showEq}
                      onChange={event => setShowEq(event.target.checked)}
                      name="eq"
                      color="primary"
                    />
                  }
                  label="Include Equity"
                />
              </FormGroup>
            </Box>
            <Box
              height={'100%'}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {sum && (
                <Title as="h2" style={{ color: getColor(sum) }}>
                  ₹{sum.toFixed(2)}
                  <br />
                  {capital && <>{percentage ? percentage.toFixed(2) : ''}%</>}
                </Title>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
