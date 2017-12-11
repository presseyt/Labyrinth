require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');



//initialize puzzle information
const problemSet = require('../db/labyrinth.json');
const Labyrinth = require('./labyrinth.js');

// let currentpuzzle = new Labyrinth(...problems[0]);


//set up view
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import CurrentPuzzle from './CurrentPuzzle.jsx';
let currentpuzzle = new Labyrinth(...problemSet[0].problem[0]);

class App extends React.Component {
  render() {
    return (
    <div>
      <Header name="Labyrinth"/>
      <div className="container-fluid">
        <div className="row">
          <Nav problems={problemSet} setPuzzle={this.setPuzzle}/>
          <CurrentPuzzle/>
        </div>
      </div>
    </div>);
  }
  setPuzzle(i,j){
    console.log('setting puzzle ', i, j);
    currentpuzzle = new Labyrinth(...problemSet[i].problem[j]);
    currentpuzzle.draw(canvas);
  }
}

ReactDOM.render(<App/>, document.getElementById('react-root'));

let canvas = document.getElementById('canvas');
currentpuzzle.draw(canvas);

document.addEventListener("keydown", e => {
  if (currentpuzzle.move(e.key)){
    currentpuzzle.draw(canvas);
    if (currentpuzzle.win) window.setTimeout(() => {
      alert('You Win!');
    }, 100);
    if (currentpuzzle.lost) window.setTimeout(() => {
      alert('You lost.');
    }, 100);
  }
})
