import Today from '../components/Today';
import Tomorrow from '../components/Tomorrow';



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
