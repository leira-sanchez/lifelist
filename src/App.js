import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
  const [newTaskToday, setNewTaskToday] = useState('');
  const [newTaskTomorrow, setNewTaskTomorrow] = useState('');
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);

  const deleteTask = (taskId, day) => {
    console.log({ taskId });
    let newToday;
    let newTomorrow;
    let lifelist = {};
    if (day === 'today') {
      today.forEach((task, index) => {
        if (task.id === taskId) {
          newToday = [...today.slice(0, index), ...today.slice(index + 1)];
        }
      });
      lifelist.today = newToday;
      lifelist.tomorrow = [...tomorrow];
      setToday(newToday);
    } else {
      tomorrow.forEach((task, index) => {
        if (task.id === taskId) {
          newTomorrow =
            [...tomorrow.slice(0, index), ...tomorrow.slice(index + 1)] || [];
        }
      });
      lifelist.today = today;
      lifelist.tomorrow = newTomorrow;
      setTomorrow(newTomorrow);
    }
    localStorage.setItem('lifelist', JSON.stringify(lifelist));
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

  const submitTask = (e, day) => {
    e.preventDefault();
    if (e.target[0].value === '') return;
    const newTaskObj = {
      name: e.target[0].value,
      created: Date.now(),
    };

    // TODO: refactor this
    const test = [...today, ...tomorrow].sort((a, z) => a.id - z.id);
    newTaskObj.id = (test.length > 0 && test[test.length - 1].id + 1) || 1;

    const lifelist = {};
    if (day === 'today') {
      lifelist.today = [...today, newTaskObj];
      lifelist.tomorrow = [...tomorrow];
      setToday(lifelist.today);
    } else {
      lifelist.today = [...today];
      lifelist.tomorrow = [...tomorrow, newTaskObj];
      setTomorrow(lifelist.tomorrow);
    }
    localStorage.setItem('lifelist', JSON.stringify(lifelist));
    setNewTaskToday('');
    setNewTaskTomorrow('');
  };

  const onChange = (e, day) => {
    if (day === 'today') setNewTaskToday(e.target.value);
    else setNewTaskTomorrow(e.target.value);
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
      const { today, tomorrow } = parsedStorage;
      today.push(
        ...[...tomorrow].filter(
          (task) => task.created <= new Date().setHours(0, 0, 0, 0)
        )
      );
      const newTomorrow = tomorrow.filter(
        (task) => task.created > new Date().setHours(0, 0, 0, 0)
      );
      setToday(today);
      setTomorrow(newTomorrow);
    }
  }, [storage]);
  return (
    <Router>
      <Navbar />
      <BoxContainer>
        <Today
          submitTask={submitTask}
          today={today}
          onChange={onChange}
          newTask={newTaskToday}
          deleteTask={deleteTask}
          duplicateTask={duplicateTask}
        />
        <Tomorrow
          submitTask={submitTask}
          tomorrow={tomorrow}
          onChange={onChange}
          newTask={newTaskTomorrow}
          deleteTask={deleteTask}
          duplicateTask={duplicateTask}
        />
      </BoxContainer>
    </Router>
  );
};

export default App;
