import { Title } from 'app/containers/HomePage/components/Title';
import { ReadPnL } from 'app/containers/Upstox';
import * as React from 'react';
import { Lead } from './components/Lead';
import { Link } from 'app/components/Link';
import { BrokerSelection } from './BrokerSelection';
import { useSelector } from 'react-redux';
import { selectBroker } from './selectors';
import Angel from '../Angel';

export function Features() {
  const broker = useSelector(selectBroker);
  return (
    <>
      <Title as="h2">Analyze your Profit and loss</Title>
      <Lead>
        Click <Link to={process.env.PUBLIC_URL + '/help'}>here</Link> to know
        how to use this application
      </Lead>
      <BrokerSelection />
      {broker === 'upstox' && <ReadPnL />}
      {broker === 'angel' && <Angel />}
    </>
  );
}
