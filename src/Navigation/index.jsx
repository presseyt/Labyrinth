const React = require('react');
const ReactDOM = require('react-dom');

import PuzzleNav from './puzzle.jsx';

require('./styles.scss');

export default class Sidebar extends React.Component {
  render() {
    const { page, problemSets, onPuzzleSelect, onPageSelect, onProblemSetSelect } = this.props;
    return (
      <div className="Navigation">
        <div className="NavButtons">
          <button onClick={() => onPageSelect('puzzle')}> Puzzles </button>
          <button onClick={() => onPageSelect('generate')}> Generate </button>
        </div>

        <PuzzleNav problemSets={problemSets} onPuzzleSelect={onPuzzleSelect} onProblemSetSelect={onProblemSetSelect} />
      </div>
    );
  }
}


