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
    background-color: #1b4965;
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
  border-bottom: 2px solid #1b4965;
  border-left: 2px solid #1b4965;
  border-right: 2px solid #1b4965;
  font-size: 1.2em;
  border-radius: ${({ tomorrow }) => {
    return tomorrow.length < 1 ? '0 0 5px 5px' : 'none';
  }};

  ::placeholder {
    padding-left: 20px;
  }
`;

const TaskItem = styled.div`
  background-color: white;
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

const Tomorrow = ({
  deleteTask,
  onChange,
  duplicateTask,
  submitTask,
  tomorrow,
  newTask,
}) => {
  const tomorrowItems = tomorrow
    .map((task, index) => (
      <TaskItem key={index} idx={index}>
        <Checkbox type="checkbox" css="display:inline;" />
        <p css="display:inline;">{task.name}</p>
        <div css="float:right; margin-right: 5px;">
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
            <ButtonItem>Move to Today</ButtonItem>
            <ButtonItem>Add Tags</ButtonItem>
            <ButtonItem isLast>Make Recurring</ButtonItem>
          </StyledToolTip>
        </div>
      </TaskItem>
    ))
    .reverse();

  return (
    <TodayBox>
      <TodayHeader>
        <h2 css=" padding: 10px 0; margin:0; text-align:center;">Tomorrow</h2>
      </TodayHeader>
      <form
        type="submit"
        onSubmit={(e) => submitTask(e, 'tomorrow')}
        htmlFor="start-typing-tomorrow"
      >
        <StartTypingBox
          autoFocus
          id="start-typing-tomorrow"
          onChange={onChange}
          placeholder="Start typing..."
          spellCheck
          tomorrow={tomorrow}
          type="text"
          value={newTask}
        />
      </form>
      {tomorrowItems}
    </TodayBox>
  );
};

export default Tomorrow;
