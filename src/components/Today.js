import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';
import Checkbox from '@material-ui/core/Checkbox';

const ActionMenuButton = styled.button`
  font-weight: bold;
  font-size: 2em;
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: lightgray;
    border-radius: 5px;
  }
`;

const TodayBox = styled.div`
  width: 40%;
`;

const TodayHeader = styled.div`
  width: 100%;
  background-color: #1b4965;
  border-left: 2px solid #1b4965;
  border-right: 2px solid #1b4965;
  color: white;
`;

const StartTypingBox = styled.input`
  width: 100%;
  width: calc(100% - 20px);
  outline: none;
  padding: 20px 0;
  padding-left: 20px;
  border-top: none;
  border-bottom: 2px solid lightgray;
  border-left: 2px solid lightgray;
  border-right: 2px solid lightgray;
  font-size: 1.2em;

  ::placeholder {
    padding-left: 20px;
  }
`;

const TaskItem = styled.div`
  width: 100%;
  padding: 10px 0;
  border-bottom: 2px solid lightgray;
  border-left: 2px solid lightgray;
  border-right: 2px solid lightgray;
  border-radius: ${({ idx }) => {
    return idx === 0 ? '0 0 5px 5px' : 'none';
  }};
`;

const ButtonItem = styled.button`
  background-color: #393939;
  outline: none;
  border: none;
  border-bottom: ${({ isLast }) => (isLast ? 'none' : '1px solid lightgray')};
  display: block;
  width: 100%;
  color: white;
  cursor: pointer;
  padding: 10px;

  :hover {
    background-color: lightgray;
    color: black;
  }
`;

const StyledToolTip = styled(ReactTooltip)`
  width: max-content;
  opacity: 1 !important;
  cursor: pointer;
  pointer-events: auto !important;
`;

const Pomodoro = styled.img`
  :hover {
  }
`;

const Today = () => {
  const storage = localStorage.getItem('lifelist');
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [timer, setTimer] = useState(25000 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const submitTask = (e) => {
    e.preventDefault();
    const newTaskObj = {
      id: (today.length > 0 && today[today.length - 1].id + 1) || 1,
      name: e.target[0].value,
      created: Date.now(),
    };

    const lifelist = {
      today: [...today, newTaskObj],
      tomorrow: tomorrow,
    };
    setToday(lifelist.today);
    localStorage.setItem('lifelist', JSON.stringify(lifelist));
    setNewTask('');
  };

  const deleteTask = (taskId) => {
    let newToday;
    today.forEach((task, index) => {
      if (task.id === taskId) {
        newToday = [...today.splice(0, index), ...today.splice(index + 1)];
      }
    });
    const lifelist = {
      today: newToday,
      tomorrow: tomorrow,
    };
    localStorage.setItem('lifelist', JSON.stringify(lifelist));
    setToday(newToday);
  };

  const duplicateTask = (taskId) => {
    const duplicatedTask = {
      id: (today.length > 0 && today[today.length - 1].id + 1) || 1,
      name: today.find((task) => task.id === taskId).name,
      created: Date.now(),
    };
    const newToday = [...today, duplicatedTask];
    const lifelist = {
      today: newToday,
      tomorrow,
    };
    localStorage.setItem('lifelist', JSON.stringify(lifelist));
    setToday(newToday);
  };

  const formatTime = (timer) => {
    // console.log({ timer });
    // const minutes = `${Math.floor(timer / 60000)}`;
    // const getMinutes = `${minutes}`.slice(-2);
    // console.log({ minutes });
    // const getSeconds = `0${timer / 25000}`.slice(-2);
    // console.log({ getSeconds });
    const min = Math.floor((timer / 1000 / 60) << 0);
    const sec =
      Math.floor((timer / 1000) % 60) < 10
        ? `0${Math.floor((timer / 1000) % 60)}`
        : Math.floor((timer / 1000) % 60);

    return `${min} : ${sec}`;
  };

  const startPomodoro = () => {
    if (isActive) handlePause();
    else if (isPaused) handleResume();
    else {
      setIsActive(true);
      countRef.current = setInterval(() => {
        setTimer((timer) => timer - 1000);
      }, 1000);
    }
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
    setIsActive(false);
  };

  const handleResume = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  const todayItems = today
    .map((task, index) => (
      <TaskItem key={index} idx={index}>
        <Checkbox type="checkbox" css="display:inline;" />
        <p css="display:inline;">
          {task.name} {formatTime(timer)}
        </p>
        <div css="float:right; margin-right: 5px;">
          <button
            css="background-color: white; border:none;outline:none; margin-right:5px;"
            onClick={startPomodoro}
          >
            <Pomodoro
              src="Tomato.svg"
              alt="start pomodoro for this task"
              title="Click to start pomodoro clock for this task"
            />
          </button>
          <ActionMenuButton
            data-tip="actions"
            data-event="click"
            data-for={`tooltip-${task.id}`}
          >
            &#8942;
          </ActionMenuButton>
          <StyledToolTip
            backgroundColor={'#393939'}
            globalEventOff="click"
            effect="solid"
            place="left"
            id={`tooltip-${task.id}`}
          >
            <ButtonItem onClick={() => deleteTask(task.id)}>Delete</ButtonItem>
            <ButtonItem onClick={() => duplicateTask(task.id)}>
              Duplicate
            </ButtonItem>
            <ButtonItem>Move to Tomorrow</ButtonItem>
            <ButtonItem>Add Tags</ButtonItem>
            <ButtonItem isLast>Make Recurring</ButtonItem>
          </StyledToolTip>
        </div>
      </TaskItem>
    ))
    .reverse();

  const onChange = (e) => {
    setNewTask(e.target.value);
  };

  useEffect(() => {
    const parsedStorage = JSON.parse(storage);
    const lifelist = {
      today: [],
      tomorrow: [],
      completed: [],
    };
    if (!storage) {
      localStorage.setItem('lifelist', JSON.stringify(lifelist));
    } else {
      // this should probably happen outside of useEffect
      setToday(parsedStorage.today);
      setTomorrow(parsedStorage.tomorrow);
    }
  }, [storage]);

  return (
    <TodayBox>
      <TodayHeader>
        <h2 css=" padding: 10px 0; margin:0; text-align:center;">Today</h2>
      </TodayHeader>
      <form type="submit" onSubmit={(e) => submitTask(e)}>
        <StartTypingBox
          type="text"
          placeholder="Start typing..."
          autoFocus
          value={newTask}
          onChange={onChange}
          spellCheck
        />
      </form>
      {todayItems}
    </TodayBox>
  );
};

export default Today;
