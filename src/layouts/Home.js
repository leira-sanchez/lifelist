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
      deleteTask={deleteTask}
      duplicateTask={duplicateTask}
      newTask={newTaskTomorrow}
      onChange={onChange}
      submitTask={submitTask}
      tomorrow={tomorrow}
    />
  </BoxContainer>
);

export default Home;
