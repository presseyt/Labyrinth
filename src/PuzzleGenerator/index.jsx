const React = require('react');

import Puzzle from '../Puzzle/index.jsx';
import Pane from './pane.jsx';

require('./styles.scss');

export default class PuzzleGenerator extends React.Component {
  constructor(props) {
    super(props);

    var worker = new Worker('./webworker.js');
    worker.onmessage = this.onWorkerMessage;

    this.state = {
      puzzle: undefined,
      building: false,
      worker: worker,
      workerData: [],
    };
  }

  onWorkerMessage = (e) => {
    // console.log('PUZZLE GENERATOR', e.data);
    const { action, maze, difficulty, solInfo, epoch } = e.data;
    const puzzle = maze && [maze._possibleMoves, maze._x, maze._y, maze._ex, maze._ey, maze._mx, maze._my];
    // console.log(action, maze, difficulty, puzzle)
    if (action === 'running') {
      // console.log('setting state');
      this.state.workerData.push({ puzzle, difficulty, solInfo, epoch });
      this.setState({ puzzle });
    } else if (action === 'done') {
      console.log('done');
      this.setState({ building: false });
    }
  }
  startWorker = (data) => {
    if(this.state.worker && this.state.worker.postMessage) {
      this.state.worker.postMessage({ action: 'build', data });
      this.setState({ building: true, workerData: [] })
    }
  }

  render() {
    const { puzzle } = this.state;
    return (
      <div className="PuzzleGenerator">
        <Pane onSubmit={this.startWorker} />
        <Puzzle puzzle={puzzle} />
      </div>
    )
  }
}


