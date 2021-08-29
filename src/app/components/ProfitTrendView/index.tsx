import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import { Title } from '../Title';
import { Line } from 'react-chartjs-2';
import styled, { useTheme } from 'styled-components/macro';

function getTrades(fnoTrades, eqTrades, showFno, showDelivery) {
  if (fnoTrades.length > 0 && eqTrades.length > 0 && showFno && showDelivery) {
    return [...fnoTrades, ...eqTrades];
  } else if (showFno && fnoTrades.length > 0) {
    return fnoTrades;
  } else if (eqTrades.length > 0 && showDelivery) {
    return eqTrades;
  } else {
    return [];
  }
}

const ProfitTrendView = ({ fnoTrades, eqTrades, getDate }) => {
  const [showFno, setShowFno] = useState(true);
  const [showEq, setShowEq] = useState(true);
  const theme = useTheme();
  const graphData: any = {};
  const sortedByDate = getTrades(fnoTrades, eqTrades, showFno, showEq)
    .slice()
    .sort((a, b) => {
      const a1 = getDate(a);
      const b1 = getDate(b);
      if (a1.isBefore(b1)) return -1;
      else if (b1.isBefore(a1)) return 1;
      else return 0;
    });
  let sum = 0;
  sortedByDate?.forEach(row => {
    const profit = row.profit;
    const date = getDate(row).format('DD MMM YYYY');
    sum += +profit;
    if (!graphData[date]) {
      graphData[date] = sum;
    } else {
      graphData[date] = sum;
    }
  });
  const data = {
    labels: Object.keys(graphData),
    datasets: [
      {
        label: 'Profit trend',
        data: Object.values(graphData).map((v: any) => v.toFixed(2)),
        fill: false,
        borderColor: 'rgb(139,165,89)',
        backgroundColor: Object.values(graphData).map((v: any) =>
          v > 0 ? 'rgba(11, 156, 49, 0.7)' : 'rgba(255, 0, 0, 0.7)',
        ),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: theme.border,
            zeroLineColor: theme.border,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: theme.border,
          },
        },
      ],
    },
  };
  return (
    <>
      <Divider />
      <Box mt={1}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Title as="h2">How your profit is trending</Title>
          <FormGroup row color="#fff">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showFno}
                  onChange={event => setShowFno(event.target.checked)}
                  name="fno"
                  color="primary"
                />
              }
              label={<Label>Include FnO</Label>}
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
              label={<Label>Include Equity</Label>}
            />
          </FormGroup>
        </Box>
        <Line data={data} options={options} height={500} />
      </Box>
    </>
  );
};

const Label = styled.div`
  color: ${p => p.theme.text};
`;
export default ProfitTrendView;
