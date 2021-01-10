/**
 *
 * TotalPnL
 *
 */
import * as React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { BarChart } from '../../../../components/BarChart';

interface Props {
  delivery: number;
  fno: number;
  intraday: number;
}

export function TotalPnL(props: Props) {
  const { delivery, fno, intraday } = props;
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
    return v > 0 ? 'rgba(11, 156, 49, 0.7)' : 'rgba(255, 0, 0, 0.7)';
  }
  return (
    <Div>
      <BarChart
        data={{
          labels: ['Delivery', 'FnO', 'Intraday'],
          datasets: [
            {
              label: 'Profit',
              data: [delivery, fno, intraday],
              backgroundColor: [
                getColor(delivery),
                getColor(fno),
                getColor(intraday),
              ],
              borderColor: [
                getColor(delivery),
                getColor(fno),
                getColor(intraday),
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
