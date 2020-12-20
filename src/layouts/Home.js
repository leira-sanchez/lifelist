import styled from 'styled-components';
import Today from '../components/Today';
import Tomorrow from '../components/Tomorrow';

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;

const Home = () => (
  <BoxContainer>
    <Today />
    <Tomorrow
    //   submitTask={submitTask}
    //   tomorrow={tomorrow}
    //   onChange={onChange}
    //   newTask={newTaskTomorrow}
    //   deleteTask={deleteTask}
    //   duplicateTask={duplicateTask}
    />
  </BoxContainer>
);

export default Home;
