import styled from 'styled-components';
import './App.css';
import Navbar from './components/Navbar';
import Today from './components/Today';

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;

const App = () => {
  return (
    <>
      <Navbar />
      <BoxContainer>
        <Today />
        <Today />
      </BoxContainer>
    </>
  );
};

export default App;
