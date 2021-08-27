import React from 'react';
import { useSelector } from 'react-redux';
import { selectAngelFnOResidue } from '../selectors';
import { ResidueTable } from '../../../components/ResidueTable';

export function Residue() {
  const fnoResidue = useSelector(selectAngelFnOResidue);
  return <ResidueTable residues={fnoResidue} />;
}
