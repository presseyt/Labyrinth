require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');

import Header from './Header.jsx';
import Nav from './Nav.jsx';
import CurrentPuzzle from './CurrentPuzzle.jsx';

const problems = require('../db/labyrinth.json');
const Labyrinth = require('./labyrinth.js');

class App extends React.Component {
  render() {
    return (
    <div>
      <Header name="Labyrinth"/>
      <div className="container-fluid">
        <div className="row">
          <Nav problems={problems}/>
          <CurrentPuzzle />
        </div>
      </div>
    </div>);
  }
}

const mountNode = document.getElementById('react-root')

ReactDOM.render(<App/>, mountNode);

let canvas = document.getElementById('canvas');

let currentpuzzle = new Labyrinth(...problems[1]);
currentpuzzle.draw(canvas);