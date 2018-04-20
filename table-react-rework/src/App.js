import React, { Component } from 'react';
import Table from './components/Table/Table';
import classes from './App.scss';
import chilidLogo from './icons/chilid-logo.svg';
import workersIcon from './icons/icon - pracownicy.svg';
import data from './dane.json';



class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
      <img id="workersIcon" src={workersIcon} />
      <h1 className="App-title">Lista Pracowników</h1>
      </header>
      <div className="container">
      <Table
                         data={data}
                         id="salesTable"/>
      <img id="chilidLogo" src={chilidLogo} />
      </div>
      </div>
    );
  }
}

export default App;
