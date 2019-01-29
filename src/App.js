import React, { Component } from 'react';
import {Button} from 'reactstrap'
import MainScreen from "../src/main/MainScreen"
import BootScreen from "../src/main/BootScreen"
import logo from './logo.svg';
import AwsSub from './main/AwsSub'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App-link">
          {/*<BootScreen/>*/}
          {/*<MainScreen/>*/}
          <AwsSub/>
      </div>
    );
  }
}

export default App;
