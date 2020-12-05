import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';
import colors from '../constants/colors';
import Checkbox from '@material-ui/core/Checkbox';

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
  padding: 20px 0;
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
      <TaskItem>
        <Checkbox type="checkbox" css="display:inline;" />
        <p css="display:inline;">Task</p>
        <div css="float:right; margin-right: 5px;">
          <button>Start</button>
          <button data-tip="actions" data-event="click">
            Menu
          </button>
          <ReactTooltip>
            <li>Delete</li>
            <li>Duplicate</li>
          </ReactTooltip>
        </div>
      </TaskItem>

      <TaskItem>
        <Checkbox type="checkbox" css="display:inline;" />
        <p css="display:inline;">Task</p>
        <div css="float:right; margin-right: 5px;">
          <button>Pomodoro</button>
          <button>Menu</button>
        </div>
      </TaskItem>
      <TaskItem>
        <Checkbox type="checkbox" css="display:inline;" />
        <p css="display:inline;">Task</p>
        <div css="float:right; margin-right: 5px;">
          <button>Pomodoro</button>
          <button>Menu</button>
        </div>
      </TaskItem>
    </TodayBox>
  );
};

export default Today;
