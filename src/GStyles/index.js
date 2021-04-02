import styled from 'styled-components';

const BoxContainer = styled.div`
  background-color: ${props => props.theme.background};
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  padding-top: 5rem;
`;

export { BoxContainer };
