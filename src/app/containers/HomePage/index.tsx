import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import Feedback from '../../components/Feedback';
import Content from '../../components/Content';
import { A } from '../../components/A';
import { Box } from '@material-ui/core';

export function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
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
        <Features />
        <Feedback />
        <Box mt={4}>
          <Content>
            If you want to try <b>zero brokerage for intraday and FnO</b> you
            may try{' '}
            <A
              href={
                'https://prism.finvasia.com/register/?franchiseLead=NzMzMzM='
              }
            >
              Finvasia.
            </A>
            Their trading platform is not the best in class, no charts and no
            option chain, but order execution is pretty smooth and error free.
            If you are someone with limited capital and brokerage eats up lot of
            your gains, you may consider.
          </Content>
        </Box>
      </PageWrapper>
    </>
  );
}
