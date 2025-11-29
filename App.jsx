import React from 'react';
import Routes from './Routes';

import { EmployeeProvider } from './contexts/EmployeeContext';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <EmployeeProvider>
      <TaskProvider>
        <Routes />
      </TaskProvider>
    </EmployeeProvider>
  );
}

export default App;