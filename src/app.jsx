require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');
import keydown, {ALL_KEYS}  from 'react-keydown';

//initialize puzzle information
const problemSet = require('../db/labyrinth.json');
const Labyrinth = require('./labyrinth.js');
let currentpuzzle = new Labyrinth(...problemSet[0].problem[0]);
currentpuzzle.i = 0;
currentpuzzle.j = 0;


//set up views
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import CurrentPuzzle from './CurrentPuzzle.jsx';

class App extends React.Component {
  @keydown(ALL_KEYS)
  handleKeyDown (e) {
    if (currentpuzzle.move(e.key)){
    currentpuzzle.draw(canvas);
    if (currentpuzzle.win) window.setTimeout(() => {
      problemSet[this.state.i].problem[this.state.j].solved = true;
      this.setPuzzle(this.state.i, this.state.j + 1)
      alert('You Win!');
    }, 100);
    if (currentpuzzle.lost) window.setTimeout(() => {
      alert('You lost.');
    }, 100);
  }
  }
  constructor(){
    super();
    this.state = {i: 0, j:0, message: problemSet[0].problem[0][7]};
  }
  render() {
    return (
    <div>
      <Header name="Labyrinth"/>
      <div className="container-fluid">
        <div className="row">
          <Nav problems={problemSet}
               puzzleSet={this.state.i}
               puzzle={this.state.j}
               setPuzzle={this.setPuzzle}/>
          <CurrentPuzzle message={this.state.message}/>
        </div>
      </div>
    </div>);
  }
  setPuzzle = (i,j) => {
    if (problemSet[i] && problemSet[i].problem[j]){
      this.setState({i, j, message: problemSet[i].problem[j][7]})
      currentpuzzle = new Labyrinth(...problemSet[i].problem[j]);
      currentpuzzle.draw(canvas);
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('react-root'));



//set document variables and add event handlers
let canvas = document.getElementById('canvas');
currentpuzzle.draw(canvas);

