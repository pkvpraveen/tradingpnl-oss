/**
 *
 * Asynchronously loads the component for BarChart
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BarChart = lazyLoad(
  () => import('./index'),
  module => module.BarChart,
);
