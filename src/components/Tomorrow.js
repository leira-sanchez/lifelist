import {
  ActionMenuButton,
  TodayBox,
  TodayHeader,
  Heading,
  StartTypingBox,
  TaskItem,
  ButtonItem,
  StyledToolTip,
  TaskContainer,
  TaskParagraph
} from './TaskStyles';

const Tomorrow = ({
  deleteTask,
  duplicateTask,
  newTask,
  onChange,
  submitTask,
  tomorrow,
}) => {
  const tomorrowItems =
    tomorrow &&
    tomorrow
      .map((task, index) =>
        tomorrow ? (
          <TaskItem key={index} idx={index}>
            <TaskContainer>
              <TaskParagraph>{task.name}</TaskParagraph>
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
        <Heading>Tomorrow</Heading>
      </TodayHeader>
      <form
        type="submit"
        onSubmit={(e) => submitTask(e, 'tomorrow')}
        htmlFor="start-typing-tomorrow"
      >
        <StartTypingBox
          id="start-typing-tomorrow"
          onChange={onChange}
          placeholder="Start typing..."
          spellCheck
          day={tomorrow}
          type="text"
          value={newTask}
        />
      </form>
      {tomorrowItems}
    </TodayBox>
  );
};

export default Tomorrow;
