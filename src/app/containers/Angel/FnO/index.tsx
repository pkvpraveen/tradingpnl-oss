import React from 'react';
import { ExpiryWisePnLGraph } from './ExpriyWisePnLGraph';
import { DateWisePnLGraph } from './FnODateWisePnL';

export function FnO() {
  return (
    <div>
      <DateWisePnLGraph />
      <ExpiryWisePnLGraph />
    </div>
  );
}
