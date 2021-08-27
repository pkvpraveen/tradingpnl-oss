/**
 *
 * Asynchronously loads the component for ReadPnL
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ReadPnL = lazyLoad(
  () => import('./index'),
  module => module.ReadPnL,
);
