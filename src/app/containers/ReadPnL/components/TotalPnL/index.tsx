/**
 *
 * TotalPnL
 *
 */
import * as React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { BarChart } from '../../../../components/BarChart';
import { useSelector } from 'react-redux';
import { selectDeliveryData, selectFnOData } from '../../selectors';

export function TotalPnL() {
  const deliveryData = useSelector(selectDeliveryData);
  const fnoData = useSelector(selectFnOData);
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
      <BarChart
        data={{
          labels: ['Delivery', 'FnO'],
          datasets: [
            {
              label: 'Gross P&L',
              data: [deliveryData?.grossPnL, fnoData?.grossPnL],
              backgroundColor: [
                getColor(deliveryData?.grossPnL),
                getColor(fnoData?.grossPnL),
              ],
              borderColor: [
                getColor(deliveryData?.grossPnL),
                getColor(fnoData?.grossPnL),
              ],
              borderWidth: 1,
            },
            {
              label: 'Charges',
              data: [deliveryData?.charges, fnoData?.charges],
              backgroundColor: ['#FFD046', '#FFD046'],
              borderColor: ['#FFD046', '#FFD046'],
              borderWidth: 1,
            },
            {
              label: 'Net P&L',
              data: [deliveryData?.netPnL, fnoData?.netPnL],
              backgroundColor: [
                getColor(deliveryData?.netPnL),
                getColor(fnoData?.netPnL),
              ],
              borderColor: [
                getColor(deliveryData?.netPnL),
                getColor(fnoData?.netPnL),
              ],
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
