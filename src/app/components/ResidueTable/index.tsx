import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import moment from 'moment';

export function ResidueTable({ residues }) {
  const trades: Array<any> = [];
  Object.keys(residues).forEach(key => {
    if (residues[key].buys.length > 0) {
      trades.push(...residues[key].buys);
    } else if (residues[key].sells.length > 0) {
      trades.push(...residues[key].buys);
    }
  });
  if (trades.length === 0) {
    return null;
  }
  function print(key, data) {
    if (key === 'Date') {
      return moment(data).format('DD MMM YYYY');
    }
    return data.toString();
  }
  return (
    <Accordion>
      <AccordionSummary
        style={{ width: '100%', padding: '0 1rem' }}
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        These trades are not included in the calculation because the
        corresponding buy or sell is not there in the excel.
      </AccordionSummary>
      <AccordionDetails>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(trades[0]).map(head => (
                <TableCell key={head}> {head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((trade, index) => (
              <TableRow key={index}>
                {Object.entries(trade).map(entry => (
                  <TableCell key={entry[0]}>
                    {print(entry[0], entry[1])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
}
