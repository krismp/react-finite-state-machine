import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Machine } from 'xstate';

const ROOT_URL = 'https://api.github.com/users';
const myMachine = Machine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        CLICK: 'loading'
      }
    },
    loading: {
      on: {
        RESOLVE: 'data',
        REJECT: 'error'
      }
    },
    data: {
      on: {
        CLICK: 'loading'
      }
    },
    error: {
      on: {
        CLICK: 'loading'
      }
    }
  }
});

class App extends Component {

  state = {
    data: {},
    dataState: 'idle',
    input: ''
  }

  searchRepositories = async () => {
    try {
      const data = await fetch(`${ROOT_URL}/${this.state.input}`).then(response => response.json());
      this.setState(({ data }), this.transition('RESOLVE'));
    } catch (error) {
      this.transition('REJECT');
    }
  }

  commands = {
    loading: this.searchRepositories
  }

  transition = action => {
    const { dataState } = this.state;

    const newState = myMachine.transition(dataState, action).value;
    const command = this.commands[newState];

    this.setState({
      dataState: newState
    }, command);
  }

  render() {
    const { data, dataState } = this.state;
    const buttonText = {
      idle: 'Fetch Github',
      loading: 'Loading ...',
      error: 'Github fail. Retry?',
      data: 'Fetch again?'
    }[dataState];

    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            <input
              type="text"
              value={this.state.input}
              onChange={e => this.setState({ input: e.target.value })}
            />
            <button
              onClick={() => this.transition('CLICK')}
              disabled={dataState === 'loading'}
            >
              {buttonText}
            </button>
          </p>
        </div>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {dataState === 'error' && <h1>Error!!!</h1>}
      </div>
    );
  }
}

export default App;
