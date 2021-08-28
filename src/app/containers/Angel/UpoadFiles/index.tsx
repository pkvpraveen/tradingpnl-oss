import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Grid } from '@material-ui/core';
import { angelActions } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import xlsParser from 'xls-parser';
import { selectBroker } from '../../HomePage/selectors';
import Content from '../../../components/Content';
import { A } from '../../../components/A';

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
        ? angelActions.loadEQData(Object.entries(rows)[0][1])
        : angelActions.loadFnOData(Object.entries(rows)[0][1]);
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
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ]}
          filesLimit={1}
          useChipsForPreview
          dropzoneText="Upload Equity P&L excel"
        />
        <Content>
          Go to{' '}
          <A target="_blank" href={'https://trade.angelbroking.com/portfolio/'}>
            Angel One
          </A>
          {
            ' Portfolio >> Equity >> My Holdings >> All transactions >> Download. Open the document and save as xlsx format. Then upload here'
          }
        </Content>
      </Grid>
      <Grid item xs={12} md={6}>
        <DropzoneArea
          onChange={files => loadDataFromFile(files, 'fno')}
          filesLimit={1}
          acceptedFiles={[
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ]}
          useChipsForPreview
          dropzoneText="Upload F&O P&L excel"
        />
        <Content>
          Go to{' '}
          <A target="_blank" href={'https://trade.angelbroking.com/portfolio/'}>
            Angel One
          </A>
          {
            ' Portfolio >> Features and Options >> My Holdings >> All transactions >> Download. Open the document and save as xlsx format. Then upload here'
          }
        </Content>
      </Grid>
    </Grid>
  );
}
