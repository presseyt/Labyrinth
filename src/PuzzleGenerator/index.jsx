const React = require('react');

import Puzzle from '../Puzzle/index.jsx';
import Pane from './pane.jsx';

import worker_script from '../worker';
console.log(worker_script)
require('./styles.scss');

export default class PuzzleGenerator extends React.Component {
  constructor(props) {
    super(props);

    var worker = new Worker(worker_script);
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
      this.setState({ building: false });
    }
  }
  startWorker = (data) => {
    if(!this.state.building && this.state.worker && this.state.worker.postMessage) {
      this.state.worker.postMessage({ action: 'build', data });
      this.setState({ building: true, workerData: [] })
    }
  }
  continueWorking = (data) => {
    if(!this.state.building && this.state.worker && this.state.worker.postMessage) {
      this.state.worker.postMessage({ action: 'continue', data });
      this.setState({ building: true })
    }
  }


  render() {
    const { puzzle } = this.state;
    return (
      <div className="PuzzleGenerator">
        <button onClick={() => this.props.onPageSelect('home')}> HOME </button>
        <Pane onSubmit={this.startWorker} onContinue={this.continueWorking} puzzle={puzzle} />
        <Puzzle
            key={this.state.workerData.length}
            static={this.state.building}
            puzzle={puzzle}
            info={(this.state.workerData[this.state.workerData.length - 1] || {}).solInfo} size={0.5}
            closeModal
        />
      </div>
    )
  }
}


