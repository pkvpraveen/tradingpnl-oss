import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Grid } from '@material-ui/core';
import { angelActions } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import xlsParser from 'xls-parser';
import { selectBroker } from '../../HomePage/selectors';

export function UploadFiles() {
  const dispatch = useDispatch();
  const broker = useSelector(selectBroker);
  const readData = (file, action) => {
    xlsParser.onFileSelection(file).then(rows => {
      dispatch(action(rows));
    });
  };
  function loadDataFromFile(files, category) {
    if (files.length === 0) {
      return;
    }

    const action = rows =>
      category === 'eq'
        ? angelActions.loadEQData(rows.Sheet1)
        : angelActions.loadFnOData(rows.Sheet1);
    readData(files[0], action);
  }

  if (!broker) {
    return null;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <DropzoneArea
          onChange={files => loadDataFromFile(files, 'eq')}
          acceptedFiles={[
            'text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ]}
          filesLimit={1}
          useChipsForPreview
          dropzoneText="Upload Equity P&L excel"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DropzoneArea
          onChange={files => loadDataFromFile(files, 'fno')}
          filesLimit={1}
          acceptedFiles={[
            'text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ]}
          useChipsForPreview
          dropzoneText="Upload F&O P&L excel"
        />
      </Grid>
    </Grid>
  );
}
