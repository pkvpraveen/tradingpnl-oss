import { Title } from 'app/containers/HomePage/components/Title';
import { ReadPnL } from 'app/containers/ReadPnL';
import * as React from 'react';
import styled from 'styled-components/macro';
import { Lead } from './components/Lead';
import { Link } from 'app/components/Link';

export function Features() {
  return (
    <>
      <Title as="h2">Analyze your Profit and loss</Title>
      <Lead>
        Click <Link to={process.env.PUBLIC_URL + '/help'}>here</Link> to know
        how to use this application
      </Lead>
      <List>
        <ReadPnL />
      </List>
    </>
  );
}

const List = styled.ul`
  padding: 0;
  margin: 2.25rem 0 0 0;
`;
