import React, { Component } from 'react';
import './App.css';
import TaskGroups from '../src/components/TaskGroups';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TaskGroups />
      </div>
    );
  }
}

export default App;
