import styled from 'styled-components/macro';

const Content = styled.div`
  color: ${p => p.theme.text};
  margin: 2rem 0 1rem 0;
  background-color: ${p => p.theme.backgroundVariant};
  padding: 10px;
`;
export default Content;
