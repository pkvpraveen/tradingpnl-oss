import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { reducer, sliceKey } from './slice';

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
      </PageWrapper>
    </>
  );
}
