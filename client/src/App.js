import React, { Component } from 'react';
//wed5yn jhj5t k logo from './logo.svg';
import './App.css';
//import { unlink } from 'fs';

const Greeting = props => {
  let { message1, message2 } = props;
  return (
    <div>
      <h1>{message1}</h1>
      <p />
      <h2>{message2}</h2>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      greeting: 'Welcome to state',
      message: '',
      movie: [
        { title: 'I am Legend' },
        { title: 'Avengers' },
        { title: 'Star Trek' }
      ]
    };
  }
  render() {
    return (
      <div className="App">
        <Greeting message1="Another greeting!" message2="Hi im component 2!" />
        <label>
          <h3> {this.state.greeting}</h3>
        </label>
        <p />
        <ul>
          {this.state.movie.map(movie => {
            return <li>{movie.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
