import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import { Title } from '../Title';
import { Line } from 'react-chartjs-2';
import styled, { useTheme } from 'styled-components/macro';
import { Chart } from 'chart.js';
import { CloudDownload } from '@material-ui/icons';

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
  const ref = useRef<Chart>();
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
  function downloadImage() {
    if (ref && ref.current) {
      const x = ref.current?.chartArea.right - 100;
      const y = ref.current?.chartArea.bottom - 50;
      const ctx = ref.current.canvas.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
      ctx.font = '30px Arial';
      ctx.fillStyle = '#ddd';
      ctx.textAlign = 'center';
      ctx.fillText('tradingpnl.in', x, y);
      const imageUrl = ref.current.canvas.toDataURL();
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = 'pnl';
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
  }

  return (
    <>
      <Divider />

      <Box mt={1}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
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
          <Box mr={1}>
            <Button
              startIcon={<CloudDownload htmlColor={theme.text} />}
              onClick={downloadImage}
            >
              <Label>Download</Label>
            </Button>
          </Box>
        </Box>
        <Line
          data={data}
          ref={ref}
          options={{
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'x',
                  onPan: ctx => {
                    ctx.chart.canvas.style.cursor = 'move';
                  },
                  onPanComplete: ctx => {
                    ctx.chart.canvas.style.cursor = 'auto';
                  },
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  onZoom: ctx => {
                    ctx.chart.canvas.style.cursor = 'zoom-in';
                  },
                  onZoomComplete: ctx => {
                    ctx.chart.canvas.style.cursor = 'auto';
                  },
                  mode: 'x',
                },
              },
            },
            maintainAspectRatio: true,
            scales: {
              y: {
                grid: {
                  color: theme.border,
                },
              },
              x: {
                grid: {
                  color: theme.border,
                },
              },
            },
          }}
        />
      </Box>
    </>
  );
};

const Label = styled.div`
  color: ${p => p.theme.text};
`;
export default ProfitTrendView;
