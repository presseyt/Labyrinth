const React = require('react');
const ReactDOM = require('react-dom');

import Puzzle from '../Puzzle/index.jsx';

require('./styles.scss');

export default class PuzzleGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzle: undefined,
      difficulties: [],
    };
  }
  componentDidMount = () => {
    var worker = new Worker('./webworker.js');
    worker.onmessage = (e) => {
      console.log('PUZZLE GENERATOR', e.data);
      const { action, maze, difficulty } = e.data;
      const puzzle = maze && [maze._possibleMoves, maze._x, maze._y, maze._ex, maze._ey, maze._mx, maze._my];
      console.log(action, maze, difficulty, puzzle)
      if (puzzle) {
        console.log('setting state');
        this.state.difficulties.push(difficulty);
        this.setState({ puzzle });
      }
    }
    worker.postMessage({ action: 'build' });
  }

  render() {
    const { puzzle } = this.state;
    return (
      <div className="PuzzleGenerator">
        <Puzzle puzzle={puzzle} />
      </div>
    )
  }
}


