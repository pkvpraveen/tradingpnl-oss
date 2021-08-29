import React from 'react';
import { ExpiryWisePnLGraph } from './ExpriyWisePnLGraph';
import { Residue } from './Residue';
import { DateWisePnLGraph } from './FnODateWisePnL';
export function FnO() {
  return (
    <div>
      <DateWisePnLGraph />
      <ExpiryWisePnLGraph />
      <Residue />
    </div>
  );
}
