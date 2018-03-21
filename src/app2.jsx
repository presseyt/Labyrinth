require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');

//tools to handle maze compression:
const MazeCompression = require('../tools/mazecompression.js');


//set up views
import Header from './Header.jsx';
import CurrentPuzzle from './CurrentPuzzle2.jsx';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      "id": 50,
      "maze": MazeCompression.uncompress("6x6 335450 fgefcemjpldoncjhcmjgejgmenlcjojlddci"),
      "difficulty": "2426.96",
      "glicko": 1200,
      "glicko_dev": 10,
      "rating": null,
      "created_at": "2018-03-16T20:53:04.447Z",
      "updated_at": "2018-03-16T20:53:04.447Z"
    }
  }

  render() {
    return (
      <div className="page-container">
        <Header name="Labyrinth"/>
        <div className="container-fluid">
          <div className="row">
            <CurrentPuzzle
                id={this.state.id}
                currentPuzzle={this.state.maze}
                nextPuzzle={this.nextPuzzle}
                prevPuzzle={this.prevPuzzle}/>
          </div>
        </div>
      </div>
    );
  }

  nextPuzzle = () => {
    console.log('next puzzle');
  }

  prevPuzzle = () => {
    console.log('prev puzzle');
  }

}

ReactDOM.render(<App/>, document.getElementById('react-root'));


