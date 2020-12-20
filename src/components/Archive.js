import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';

const ActionMenuButton = styled.button`
  font-weight: bold;
  font-size: 2em;
  background-color: white;
  border: none;
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
  border-radius: ${({ tomorrow }) => {
    return tomorrow.length < 1 ? '0 0 5px 5px' : 'none';
  }};
`;

const TaskItem = styled.div`
  background-color: white;
  width: 100%;
  padding: 3.3px 0;
  border-bottom: 2px solid #1b4965;
  border-left: 2px solid #1b4965;
  border-right: 2px solid #1b4965;
  border-radius: ${({ idx }) => {
    return idx === 0 ? '0 0 5px 5px' : 'none';
  }};
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Archive = ({
  deleteTask,
  duplicateTask,
  completed,
  newTask,
  onChange,
  submitTask,
  tomorrow,
}) => {
  const tomorrowItems =
    tomorrow &&
    tomorrow
      .map((task, index) =>
        completed ? (
          <TaskItem key={index} idx={index}>
            <p css="display:inline; margin-left: 20px;">{task.name}</p>
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
                <ButtonItem onClick={() => deleteTask(task.id, 'tomorrow')}>
                  Delete
                </ButtonItem>
                <ButtonItem onClick={() => duplicateTask(task.id)}>
                  Duplicate
                </ButtonItem>
                <ButtonItem>Move to Today</ButtonItem>
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
        <h2 css=" padding: 10px 0; margin:0; text-align:center;">Archive</h2>
      </TodayHeader>
      {tomorrowItems}
    </TodayBox>
  );
};

export default Archive;
