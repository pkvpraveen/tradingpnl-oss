import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { PageWrapper } from '../../components/PageWrapper';
import styled from 'styled-components/macro';
import { Title } from '../../components/Title';
import Upload from './assets/upload.png';
import Success from './assets/success.png';
import SelectReport from './assets/selectreport.png';
import SelectPnl from './assets/selectpnl.png';
import DownloadReport from './assets/downloadreport.png';
import { Link as RouterLink } from 'react-router-dom';
import { A } from '../../components/A';

export const Help = () => {
  return (
    <>
      <Helmet>
        <title>Analyze PnL</title>
        <meta
          name="description"
          content="An application to analyze your trading pnl"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Title>How to use this application</Title>
        <Content>
          Login to{' '}
          <A target="_blank" href={'https://account.upstox.com/'}>
            accounts.upstox.com
          </A>
        </Content>
        <Content>Go to Reports</Content>
        <Image src={SelectReport} alt={'Go to reports'} />
        <Content>Go to Profit & Loss</Content>
        <Image src={SelectPnl} alt={'Select pnl'} />
        <Content>Download both Equity and F&O reports in excel format</Content>
        <Image
          src={DownloadReport}
          alt={'Download both Equity and F&O reports in excel format'}
        />
        <Content>Upload to this application</Content>
        <Image src={Upload} alt={'Upload to this application'} />
        <Content>View and analyze your pnl graphically</Content>
        <Image src={Success} alt={'View and analyze your pnl graphically'} />
        <Footer>
          <Link to={process.env.PUBLIC_URL + '/'}>Start Analyzing</Link>
        </Footer>
        <Content>
          This application does not export any data. All data resides only in
          your browser. Still you are in doubt, feel free to disconnect internet
          when you upload your pnl.
        </Content>
      </PageWrapper>
    </>
  );
};
const Content = styled.div`
  color: ${p => p.theme.text};
  margin: 2rem 0 1rem 0;
  background-color: ${p => p.theme.backgroundVariant};
  padding: 10px;
`;
const Footer = styled.div`
  color: ${p => p.theme.text};
  margin: 5rem 0 5rem 0;
  background-color: ${p => p.theme.backgroundVariant};
  padding: 5rem;
`;
const Image = styled.img`
  width: 70%;
`;
export const Link = styled(RouterLink)`
  color: ${p => p.theme.primary};
  text-decoration: none;
  background-color: #2f4fff; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 250px;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;
