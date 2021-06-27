/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './containers/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { Help } from './containers/Help';
import 'chartjs-plugin-datalabels';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export function App() {
  const { i18n } = useTranslation();
  Chart.plugins.register(ChartDataLabels);
  Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
    color: '#aaa',
    align: 'end',
    anchor: 'end',
    formatter: function(value, context) {
      return '₹' + value;
    },
  });
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Trading P&L"
        defaultTitle="Trading P&L"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="An application to analyze your trading pnl"
        />
      </Helmet>

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route exact path={process.env.PUBLIC_URL + '/help'} component={Help} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
