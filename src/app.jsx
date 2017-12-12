require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');


//set up views
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import CurrentPuzzle from './CurrentPuzzle.jsx';

const problemSet = require('../db/labyrinth.json');


class App extends React.Component {
  constructor(){
    super();
    this.state = {i: 0, j:0};
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
          <CurrentPuzzle
              i={this.state.i}
              j={this.state.j}
              nextPuzzle={this.nextPuzzle}/>
        </div>
      </div>
      <p>{document.cookie}</p>
    </div>);
  }

  nextPuzzle = () => {
    problemSet[this.state.i].problem[this.state.j].solved = true;
    this.setPuzzle(this.state.i, this.state.j + 1)
  }

  setPuzzle = (i,j) => {
    if (problemSet[i] && problemSet[i].problem[j]){
      this.setState({i, j})
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('react-root'));



// //set document variables and add event handlers
// let canvas = document.getElementById('canvas');
// currentpuzzle.draw(canvas);

