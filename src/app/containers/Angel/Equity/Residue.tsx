import React from 'react';
import { useSelector } from 'react-redux';
import { selectAngelEQResidue } from '../selectors';
import { ResidueTable } from '../../../components/ResidueTable';

export function Residue() {
  const eqResidue = useSelector(selectAngelEQResidue);
  return <ResidueTable residues={eqResidue} />;
}
