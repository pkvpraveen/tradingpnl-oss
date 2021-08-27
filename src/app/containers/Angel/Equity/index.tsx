import React from 'react';
import { ScriptWisePnLGraph } from './ScripWisePnLGraph';
import { Residue } from './Residue';
export function Equity() {
  return (
    <div>
      <ScriptWisePnLGraph />
      <Residue />
    </div>
  );
}
