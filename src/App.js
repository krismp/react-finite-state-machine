import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      label: null
    }
  }

  handleOnChange = e => {
    this.setState({
      label: e.target.value
    })
  }

  render() {
    const { label } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, {label}</h1>
        </header>
        <p className="App-intro">
          <input type="text" onChange={this.handleOnChange} />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
