import { useState, useRef } from 'react';
// import styled from 'styled-components/macro';
import Checkbox from '@material-ui/core/Checkbox';
import {
  ActionMenuButton,
  TodayBox,
  TodayHeader,
  StartTypingBox,
  Heading,
  TaskItem,
  ButtonItem,
  StyledToolTip,
  PomodoroButton,
  TaskContainer
} from './TaskStyles';

const Today = ({
  deleteTask,
  onChange,
  duplicateTask,
  submitTask,
  today,
  onCompletion,
  completed,
  newTask,
  completedToday,
}) => {
  const [timer, setTimer] = useState(25000 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activePomodoroId, setActivePomodoroId] = useState('');
  const [checkedId, setCheckedId] = useState('');
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

  const todayItems = [...completedToday, ...today]
    .map((task, index) =>
      task ? (
        <TaskItem key={index} idx={index}>
          <TaskContainer>
            <Checkbox
              type="checkbox"
              css="display:inline;"
              checked={completed.includes(task)}
              onChange={() => onCompletion(task.id)}
            />
            <p css="display:inline;">{task.name}</p>
            {activePomodoroId === task.id ? <i> {formatTime(timer)}</i> : null}
          </TaskContainer>
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
        <Heading>Today</Heading>
      </TodayHeader>
      <form
        type="submit"
        onSubmit={(e) => submitTask(e, 'today')}
        htmlFor="start-typing-today"
      >
        <StartTypingBox
          autoFocus
          id="start-typing-today"
          onChange={(e) => onChange(e, 'today')}
          placeholder="Start typing..."
          spellCheck
          day={today}
          type="text"
          value={newTask}
        />
      </form>
      {todayItems}
    </TodayBox>
  );
};

export default Today;
