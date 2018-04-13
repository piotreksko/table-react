import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import classes from './App.css';
import chilidLogo from './icons/chilid-logo.svg';
import workersIcon from './icons/icon - pracownicy.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
      <img id="workersIcon" src={workersIcon} />
      <h1 className="App-title">Lista Pracowników</h1>
      </header>
      <Table>
      </Table>
      <img id="chilidLogo" src={chilidLogo} />

      </div>
    );
  }
}

export default App;
