import { useEffect, useState } from 'react';
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
  /* background-color: #bee9e8; */
  outline: none;
  border: none;
  border-bottom: ${({ isLast }) => (isLast ? 'none' : '1px solid lightgray')};
  display: block;
  width: 100%;
  color: white;
  cursor: pointer;
  padding: 10px;
`;

const StyledToolTip = styled(ReactTooltip)`
  width: max-content;
  opacity: 1 !important;
`;
const Today = () => {
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);

  const submitTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: (today.length > 0 && today[today.length - 1].id + 1) || 1,
      name: e.target[0].value,
      created: Date.now(),
    };

    const lifelist = {
      today: [...today, newTask],
      tomorrow: { ...tomorrow },
    };
    setToday(lifelist.today);
    localStorage.setItem('lifelist', JSON.stringify(lifelist));
  };

  // TODO: ponerlas al reves
  const todayItems = today
    .map((task, index) => (
      <TaskItem key={index} idx={index}>
        <Checkbox type="checkbox" css="display:inline;" />
        <p css="display:inline;">{task.name}</p>
        <div css="float:right; margin-right: 5px;">
          <button>Start</button>
          <ActionMenuButton data-tip="actions" data-event="click">
            &#8942;
          </ActionMenuButton>
          <StyledToolTip
            backgroundColor={'#393939'}
            globalEventOff="click"
            effect="solid"
            place="left"
          >
            <ButtonItem>Delete</ButtonItem>
            <ButtonItem>Duplicate</ButtonItem>
            <ButtonItem>Move to Tomorrow</ButtonItem>
            <ButtonItem isLast>Make Recurring</ButtonItem>
          </StyledToolTip>
        </div>
      </TaskItem>
    ))
    .reverse();

  useEffect(() => {
    const storage = localStorage.getItem('lifelist');
    const parsedStorage = JSON.parse(storage);
    const lifelist = {
      today: [],
      tomorrow: [],
      completed: [],
    };
    if (!storage) {
      localStorage.setItem('lifelist', JSON.stringify(lifelist));
    } else {
      setToday(parsedStorage.today);
      setTomorrow(parsedStorage.tomorrow);
    }
  }, []);

  return (
    <TodayBox>
      <TodayHeader>
        <h2 css=" padding: 10px 0; margin:0; text-align:center;">Today</h2>
      </TodayHeader>
      <form type="submit" onSubmit={(e) => submitTask(e)}>
        <StartTypingBox type="text" placeholder="Start typing..." autoFocus />
      </form>
      {todayItems}
    </TodayBox>
  );
};

export default Today;
