import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Grid } from '@material-ui/core';
import { readPnLActions } from '../../slice';
import { useDispatch, useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file';
import xlsParser from 'xls-parser';
import { selectBroker } from '../../../HomePage/selectors';
export function UploadFiles() {
  const dispatch = useDispatch();
  const broker = useSelector(selectBroker);
  const readData = {
    'application/vnd.ms-excel': (file, action) => {
      xlsParser.onFileSelection(file).then(rows => {
        dispatch(action(rows));
      });
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': (
      file,
      action,
    ) => {
      readXlsxFile(file).then(rows => {
        dispatch(action(rows));
      });
    },
  };
  function loadDataFromFile(files, category) {
    if (files.length === 0) {
      return;
    }
    const action = rows =>
      category === 'eq'
        ? readPnLActions.loadEQData(rows)
        : readPnLActions.loadFnOData(rows);
    readData[files[0].type](files[0], action);
  }
  if (!broker) {
    return null;
  }
  return (
    <>
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
    </>
  );
}
