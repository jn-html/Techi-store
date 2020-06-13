import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {FaHome} from 'react-icons/fa';

class App extends Component {
  render() {
    return (
      <h1>
        Hello from tech store<FaHome />
      </h1>
    );
  }
}

export default App;
