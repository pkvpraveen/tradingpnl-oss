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
        <Feature>
          <Content>
            <ReadPnL />
          </Content>
        </Feature>
      </List>
    </>
  );
}

const Feature = styled.li`
  display: flex;
  margin: 6.25rem 0 6.25rem 2.25rem;

  .feature-icon {
    width: 6.25rem;
    height: 6.25rem;
    margin-right: 2.25rem;
    flex-shrink: 0;
  }
`;
const Content = styled.div`
  flex: 1;
`;

const List = styled.ul`
  padding: 0;
  margin: 6.25rem 0 0 0;
`;
