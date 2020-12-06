import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';
import colors from '../constants/colors';
import Checkbox from '@material-ui/core/Checkbox';

const { juneBud } = colors;

const TodayBox = styled.div`
  border: 2px solid white;
  border-radius: 5px;
  width: 40%;
  height: 50vh;

  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
`;

const TodayHeader = styled.div`
  width: 100%;
  /* outline: 2px red solid; */
  background-color: ${juneBud};
  border-radius: 4px 4px 0 0;
  border-bottom: 2px solid lightgray;
`;

const StartTypingBox = styled.input`
  width: 100%;
  width: calc(100% - 20px);
  outline: none;
  padding: 20px 0;
  padding-left: 20px;
  border-bottom: 2px solid lightgray;
  border-right: none;
  border-left: none;
  border-top: none;
  font-size: 1.2em;

  ::placeholder {
    padding-left: 20px;
  }
`;

const TaskItem = styled.div`
  width: 100%;
  /* outline: 2px red solid; */
  padding: 10px 0;
  border-bottom: 2px solid lightgray;
`;

const Today = () => {
  const [today, setToday] = useState({});
  const [tomorrow, setTomorrow] = useState({});

  const submitTask = (e) => {
    e.preventDefault();
    console.log('submitting');
    const newTask = e.target[0].value;
    console.log({ newTask });
    const newTodayTasks = {
      newTask,
    };
    const lifelist = {
      today: { ...today, newTask },
      tomorrow: { ...tomorrow },
    };
    setToday(newTodayTasks);
    localStorage.setItem('lifelist', JSON.stringify(lifelist));
  };

  const todayItems = Object.entries(today).map((task) => {
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
    </TaskItem>;
  });

  useEffect(() => {
    const storage = localStorage.getItem('lifelist');
    const lifelist = {
      today: {},
      tomorrow: {},
      completed: {},
    };
    if (!storage) {
      localStorage.setItem('lifelist', JSON.stringify(lifelist));
    } else {
      setToday(storage.today);
      setTomorrow(storage.tomorrow);
    }
    console.table(JSON.parse(storage));
  }, []);

  return (
    <TodayBox>
      <TodayHeader>
        <h2 css=" padding: 10px 0; margin:0; text-align:center;">Today</h2>
      </TodayHeader>
      {/* <StartTypingBox>Start typing ...</StartTypingBox> */}
      <form type="submit" onSubmit={(e) => submitTask(e)}>
        <StartTypingBox type="text" placeholder="Start typing ..." autoFocus />
      </form>
      {todayItems}

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
