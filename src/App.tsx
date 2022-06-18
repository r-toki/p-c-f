import './App.css';

import { useEffect } from 'react';

import {
  deleteActivity,
  getActivities,
  getActivity,
  postActivities,
  putActivity,
} from './api-client';

function App() {
  useEffect(() => {
    getActivities().then((res) => {
      console.log('--- getActivities ---');
      console.log(res.data);
    });

    postActivities({
      id: 0,
      title: 'End of the century',
      dueDate: new Date('1999-12-31').toISOString(),
      completed: false,
    }).then((res) => {
      console.log('--- postActivities ---');
      console.log(res.data);
    });

    getActivity(1).then((res) => {
      console.log('--- getActivity ---');
      console.log(res.data);
    });

    putActivity(1, {
      id: 0,
      title: 'Start of the century',
      dueDate: new Date('2000-01-01').toISOString(),
      completed: true,
    }).then((res) => {
      console.log('--- putActivity ---');
      console.log(res.data);
    });

    deleteActivity(1).then((res) => {
      console.log('--- deleteActivity ---');
      console.log(res.data);
    });
  }, []);

  return <h1>This is App.tsx</h1>;
}

export default App;
