import React from 'react';
import { BarChart } from '../BarChart';
import styled, { useTheme } from 'styled-components/macro';
import { Box } from '@material-ui/core';
import { Title } from '../Title';
export function TotalPnLChart({
  eqGrossPnL,
  eqNetPnL,
  eqCharges,
  fnoGrossPnL,
  fnoNetPnL,
  fnoCharges,
}) {
  const eqGrossPnLStr = (eqGrossPnL || 0).toFixed(2);
  const eqNetPnLStr = (eqNetPnL || 0).toFixed(2);
  const eqChargesStr = (eqCharges || 0).toFixed(2);
  const fnoGrossPnLStr = (fnoGrossPnL || 0).toFixed(2);
  const fnoNetPnLStr = (fnoNetPnL || 0).toFixed(2);
  const fnoChargesStr = (fnoCharges || 0).toFixed(2);
  const theme = useTheme();
  const options = {
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
  function getColor(v) {
    return parseFloat(v) > 0
      ? 'rgba(11, 156, 49, 0.7)'
      : 'rgba(255, 0, 0, 0.7)';
  }
  return (
    <Div>
      <Title as="h2">Summary</Title>
      <Box display="flex">
        <h3
          style={{
            color: theme.textSecondary,
          }}
        >
          Total Profit
        </h3>
        <h3
          style={{
            color: getColor((eqNetPnL || 0) + (fnoNetPnL || 0)),
            marginLeft: 10,
          }}
        >{`₹${((eqNetPnL || 0) + (fnoNetPnL || 0)).toFixed(2)}`}</h3>
        <>
          <h3
            style={{
              color: theme.textSecondary,
              marginLeft: 20,
            }}
          >
            FnO
          </h3>
          <h3
            style={{
              color: getColor(fnoNetPnLStr),
              marginLeft: 10,
            }}
          >{` ₹${fnoNetPnLStr}`}</h3>
        </>

        <>
          <h3
            style={{
              color: theme.textSecondary,
              marginLeft: 20,
            }}
          >
            Equity
          </h3>
          <h3
            style={{
              color: getColor(eqNetPnLStr),
              marginLeft: 10,
            }}
          >{`₹${eqNetPnLStr}`}</h3>
        </>
      </Box>
      <BarChart
        data={{
          labels: ['Delivery', 'FnO'],
          datasets: [
            {
              label: 'Gross P&L',
              data: [eqGrossPnLStr, fnoGrossPnLStr],
              backgroundColor: [
                getColor(eqGrossPnLStr),
                getColor(fnoGrossPnLStr),
              ],
              borderColor: [getColor(eqGrossPnLStr), getColor(fnoGrossPnLStr)],
              borderWidth: 1,
            },
            {
              label: 'Charges',
              data: [eqChargesStr, fnoChargesStr],
              backgroundColor: ['#FFD046', '#FFD046'],
              borderColor: ['#FFD046', '#FFD046'],
              borderWidth: 1,
            },
            {
              label: 'Net P&L',
              data: [eqNetPnLStr, fnoNetPnLStr],
              backgroundColor: [getColor(eqNetPnLStr), getColor(fnoNetPnLStr)],
              borderColor: [getColor(eqNetPnLStr), getColor(fnoNetPnLStr)],
              borderWidth: 1,
            },
          ],
        }}
        options={options}
      />
    </Div>
  );
}
const Div = styled.div``;
