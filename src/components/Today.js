import styled from 'styled-components/macro';
import colors from '../constants/colors';

const { juneBud } = colors;

const TodayBox = styled.div`
  border: 2px solid black;
  width: 40%;
  height: 50vh;
`;

const TodayHeader = styled.div`
  width: 100%;
  /* outline: 2px red solid; */
  background-color: ${juneBud};
  border-bottom: 2px solid black;
`;
// TODO: this one should be an input
const StartTypingBox = styled.div`
  width: 100%;
  /* outline: 2px red solid; */
  padding: 10px 0;
  border-bottom: 2px solid black;
`;

const TaskItem = styled.div`
  width: 100%;
  /* outline: 2px red solid; */
  padding: 10px 0;
  border-bottom: 2px solid black;
`;

const Today = () => {
  return (
    <TodayBox>
      <TodayHeader>
        <h2 css=" padding: 10px 0; margin:0; text-align:center;">Today</h2>
      </TodayHeader>
      <StartTypingBox>Start typing ...</StartTypingBox>
      {/* <StartTypingBox /> */}
      <TaskItem>Task</TaskItem>
      <TaskItem>Task</TaskItem>
      <TaskItem>Task</TaskItem>
      <TaskItem>Task</TaskItem>
    </TodayBox>
  );
};

export default Today;
