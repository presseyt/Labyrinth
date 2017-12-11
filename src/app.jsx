require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');



//initialize puzzle information
const problems = require('../db/labyrinth.json');
const Labyrinth = require('./labyrinth.js');

let currentpuzzle = new Labyrinth(...problems[1]);


//set up view
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import CurrentPuzzle from './CurrentPuzzle.jsx';

class App extends React.Component {
  render() {
    return (
    <div>
      <Header name="Labyrinth"/>
      <div className="container-fluid">
        <div className="row">
          <Nav problems={problems}/>
          <CurrentPuzzle/>
        </div>
      </div>
    </div>);
  }
}

ReactDOM.render(<App/>, document.getElementById('react-root'));

let canvas = document.getElementById('canvas');
currentpuzzle.draw(canvas);

document.addEventListener("keydown", e => {
  currentpuzzle.move(e.key);
  currentpuzzle.draw(canvas);
  if (currentpuzzle.win) window.setTimeout(() => {
    alert('You Win!');
  }, 100);
})
