import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Navbar from './components/Navbar';
import Today from './components/Today';
import Tomorrow from './components/Tomorrow';

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;

const App = () => {
  document.title = 'Lifelist';
  const storage = localStorage.getItem('lifelist');
  const [newTask, setNewTask] = useState('');
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);

  const deleteTask = (taskId) => {
    console.log({ taskId });
    let newToday;
    today.forEach((task, index) => {
      if (task.id === taskId) {
        newToday = [...today.slice(0, index), ...today.slice(index + 1)];
      }
    });
    const lifelist = {
      today: newToday,
      tomorrow: tomorrow,
    };
    localStorage.setItem('lifelist', JSON.stringify(lifelist));
    setToday(newToday);
  };

  const submitTask = (e) => {
    e.preventDefault();
    const newTaskObj = {
      id: (today.length > 0 && today[today.length - 1].id + 1) || 1,
      name: e.target[0].value,
      created: Date.now(),
    };

    const lifelist = {
      today: [...today, newTaskObj],
      tomorrow: [...tomorrow],
    };
    setToday(lifelist.today);
    localStorage.setItem('lifelist', JSON.stringify(lifelist));
    setNewTask('');
  };

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
    <>
      <Navbar />
      <BoxContainer>
        <Today
          submitTask={submitTask}
          today={today}
          tomorrow={tomorrow}
          onChange={onChange}
          setToday={setToday}
          newTask={newTask}
          deleteTask={deleteTask}
        />
        {/* <Tomorrow /> */}
      </BoxContainer>
    </>
  );
};

export default App;
