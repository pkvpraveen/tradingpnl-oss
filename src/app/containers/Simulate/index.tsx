import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { PageWrapper } from '../../components/PageWrapper';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { BarChart } from './Bar';

export function Simulate() {
  const [initialAmount, setInitialAmount] = useState('300000');
  const [brokeragePaidPerWeek, setBrokeragePaidPerWeek] = useState('300');
  const [
    possibleReturnPerWeekInPercentage,
    setPossibleReturnPerWeekInPercentage,
  ] = useState('1');
  const [
    possibleLossPerWeekInPercentage,
    setPossibleLossPerWeekInPercentage,
  ] = useState('2');
  const [expectedProfitOverAnYear, setExpectedProfitOverAnYear] = useState(
    '40',
  );

  const [numberOfSimulations, setNumberOfSimulations] = useState('100000');
  const [rows, setRows] = useState<
    Array<{ profitability: number; numberOfProfitableSimulations: number }>
  >([]);
  const [isRunning, setRunning] = useState(false);

  function handleClick() {
    setRunning(true);
    setRows([]);
    const worker = new window.Worker('simworker.js');
    worker.postMessage({
      initialAmount: parseInt(initialAmount),
      brokeragePaidPerWeek: parseInt(brokeragePaidPerWeek),
      possibleReturnPerWeekInPercentage: parseInt(
        possibleReturnPerWeekInPercentage,
      ),
      possibleLossPerWeekInPercentage: parseInt(
        possibleLossPerWeekInPercentage,
      ),
      expectedProfitOverAnYear: parseInt(expectedProfitOverAnYear),
      numberOfSimulations: parseInt(numberOfSimulations),
    });
    worker.onerror = err => err;
    worker.onmessage = e => {
      const { results } = e.data;
      setRows(results);
      setRunning(false);
    };
  }
  return (
    <>
      <Helmet>
        <title>Analyze PnL</title>
        <meta
          name="description"
          content="An application to analyze your trading pnl"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                {' '}
                <TextField
                  value={initialAmount}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label={'Initial Amount'}
                  onChange={e => setInitialAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  value={brokeragePaidPerWeek}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label={'Brokerage Paid Per Week'}
                  onChange={e => setBrokeragePaidPerWeek(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {' '}
                <TextField
                  value={possibleReturnPerWeekInPercentage}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label={'Possible Return Per Week (in %)'}
                  onChange={e =>
                    setPossibleReturnPerWeekInPercentage(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  value={possibleLossPerWeekInPercentage}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label={'Possible Loss Per Week (in %)'}
                  onChange={e =>
                    setPossibleLossPerWeekInPercentage(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  value={expectedProfitOverAnYear}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label={'Expected Profit Over an Year'}
                  onChange={e => setExpectedProfitOverAnYear(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  value={numberOfSimulations}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label={'Number Of Simulations To Run'}
                  onChange={e => setNumberOfSimulations(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              disabled={isRunning}
              onClick={handleClick}
              variant="contained"
              color="primary"
            >
              Run Simulation
            </Button>
          </CardActions>
        </Card>

        {isRunning && (
          <LinearProgress variant="indeterminate" color="primary" />
        )}
        {rows.length > 0 && <BarChart rows={rows} />}
        <Box mt={2}>
          <Card>
            {rows.length > 0 && (
              <TableContainer style={{ maxHeight: 500 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Probability Of Profit/Trade</TableCell>
                      <TableCell>
                        Percentage of profitable simulations
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.profitability}>
                        <TableCell>{row.profitability}</TableCell>
                        <TableCell>
                          {row.numberOfProfitableSimulations}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Card>
        </Box>
      </PageWrapper>
    </>
  );
}
