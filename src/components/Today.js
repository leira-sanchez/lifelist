import { useState, useRef } from 'react';
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
  padding: 0 10px;
  margin-right: 5px;

  :hover {
    background-color: lightgray;
    border-radius: 5px;
  }
`;

const TodayBox = styled.div`
  width: 40%;
`;

const TodayHeader = styled.div`
  width: calc(100% + 4px);
  border-top: 5px solid #5fa8d3;
  background-color: #1b4965;
  color: white;
`;

const StartTypingBox = styled.input`
  width: 100%;
  width: calc(100% - 20px);
  outline: none;
  padding: 20px 0;
  padding-left: 20px;
  border-top: none;
  border-bottom: 2px solid #1b4965;
  border-left: 2px solid #1b4965;
  border-right: 2px solid #1b4965;
  font-size: 1.2em;
  border-radius: ${({ today }) => {
    return today.length < 1 ? '0 0 5px 5px' : 'none';
  }};

  ::placeholder {
    padding-left: 20px;
  }
`;

const TaskItem = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 2px solid #1b4965;
  border-left: 2px solid #1b4965;
  border-right: 2px solid #1b4965;
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

const PomodoroButton = styled.button`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;

  :hover {
    background-color: lightgray;
  }
`;

const Today = ({
  deleteTask,
  onChange,
  duplicateTask,
  submitTask,
  today,
  newTask,
}) => {
  const [timer, setTimer] = useState(25000 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activePomodoroId, setActivePomodoroId] = useState('');
  const countRef = useRef(null);

  const formatTime = (timer) => {
    const min = Math.floor((timer / 1000 / 60) << 0);
    const plainSeconds = Math.floor((timer / 1000) % 60);
    const sec = plainSeconds < 10 ? `0${plainSeconds}` : plainSeconds;

    return `${min}:${sec}`;
  };

  const startPomodoro = (id) => {
    setActivePomodoroId(id);
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
      setTimer((timer) => timer - 1000);
    }, 1000);
  };

  const todayItems = today
    .map((task, index) =>
      task ? (
        <TaskItem key={index} idx={index}>
          <div>
            <Checkbox type="checkbox" css="display:inline;" />
            <p css="display:inline;">{task.name}</p>
            {activePomodoroId === task.id ? <i> {formatTime(timer)}</i> : null}
          </div>
          <div>
            <PomodoroButton>
              <img
                onClick={() => startPomodoro(task.id)}
                src="Tomato.svg"
                alt="start pomodoro for this task"
                title="Click to start pomodoro clock for this task"
                role="button"
              />
            </PomodoroButton>
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
              <ButtonItem onClick={() => deleteTask(task.id, 'today')}>
                Delete
              </ButtonItem>
              <ButtonItem onClick={() => duplicateTask(task.id)}>
                Duplicate
              </ButtonItem>
              <ButtonItem>Move to Tomorrow</ButtonItem>
              <ButtonItem>Add Tags</ButtonItem>
              <ButtonItem isLast>Make Recurring</ButtonItem>
            </StyledToolTip>
          </div>
        </TaskItem>
      ) : null
    )
    .reverse();

  return (
    <TodayBox>
      <TodayHeader>
        <h2 css=" padding: 10px 0; margin:0; text-align:center;">Today</h2>
      </TodayHeader>
      <form
        type="submit"
        onSubmit={(e) => submitTask(e, 'today')}
        htmlFor="start-typing-today"
      >
        <StartTypingBox
          type="text"
          placeholder="Start typing..."
          autoFocus
          value={newTask}
          onChange={(e) => onChange(e, 'today')}
          spellCheck
          id="start-typing-today"
          today={today}
        />
      </form>
      {todayItems}
    </TodayBox>
  );
};

export default Today;
