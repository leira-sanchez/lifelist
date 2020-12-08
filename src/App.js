import styled from 'styled-components';
import './App.css';
import Navbar from './components/Navbar';
import Today from './components/Today';
import Tomorrow from './components/Tomorrow';

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;

const App = () => {
  document.title = 'Lifelist';
  return (
    <>
      <Navbar />
      <BoxContainer>
        <Today />
        {/* <Tomorrow /> */}
      </BoxContainer>
    </>
  );
};

export default App;
