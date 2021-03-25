import {
  ActionMenuButton,
  TodayBox,
  TodayHeader,
  Heading,
  TaskItem,
  ButtonItem,
  StyledToolTip,
  TaskContainer,
} from '../TaskStyles';

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
            <TaskContainer>
              <p css="display:inline; margin-left: 20px;">{task.name}</p>
            </TaskContainer>
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
        <Heading>Archive</Heading>
      </TodayHeader>
      {tomorrowItems}
    </TodayBox>
  );
};

export default Archive;
