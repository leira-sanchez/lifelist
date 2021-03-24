import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';

export const ActionMenuButton = styled.button`
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

export const TodayBox = styled.div`
  width: 40%;
`;

export const TodayHeader = styled.div`
  width: calc(100% + 4px);
  border-top: 5px solid #5fa8d3;
  background-color: #1b4965;
  color: white;
`;

export const Heading = styled.h2`
  padding: 10px 0;
  margin: 0;
  text-align: center;
`;

export const StartTypingBox = styled.input.attrs((props) => ({
  day: props.day,
}))`
  width: 100%;
  width: calc(100% - 40px);
  outline: none;
  padding: 20px 0;
  padding-left: 40px;
  border-top: none;
  border-bottom: 2px solid #1b4965;
  border-left: 2px solid #1b4965;
  border-right: 2px solid #1b4965;
  font-size: 1.2em;
  border-radius: ${(props) => (props.day < 1 ? '0 0 5px 5px' : 'none')};
`;

export const TaskItem = styled.div.attrs((props) => ({ idx: props.idx }))`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 2px solid #1b4965;
  border-left: 2px solid #1b4965;
  border-right: 2px solid #1b4965;
  border-radius: ${(idx) => (idx === 0 ? '0 0 5px 5px' : 'none')};
  }};
`;

export const ButtonItem = styled.button.attrs((props) => ({
  isLast: props.isLast,
}))`
  background-color: #393939;
  outline: none;
  border: none;
  border-bottom: ${(isLast) => (isLast ? 'none' : '1px solid lightgray')};
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

export const StyledToolTip = styled(ReactTooltip)`
  width: max-content;
  opacity: 1 !important;
  cursor: pointer;
  pointer-events: auto !important;
`;

export const PomodoroButton = styled.button`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;

  :hover {
    background-color: lightgray;
  }
`;

export const TaskContainer = styled.div`
  padding: 0 10px;
`;
