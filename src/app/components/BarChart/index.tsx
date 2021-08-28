/**
 *
 * BarChart
 *
 */
import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components/macro';

interface Props {
  data: any;
  options: any;
}

export const BarChart = memo((props: Props) => {
  return (
    <Div>
      <Bar data={props.data} options={props.options} />
    </Div>
  );
});

const Div = styled.div`
  padding: 2rem 2rem;
  padding-right: 1rem;
`;
