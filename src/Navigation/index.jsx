const React = require('react');
const ReactDOM = require('react-dom');

import PuzzleNav from './puzzle.jsx';

require('./styles.scss');

export default class Sidebar extends React.Component {
  render() {
    const { page, problemSets, onPuzzleSelect, onPageSelect } = this.props;
    return (
      <div className="Navigation">
        { page && (
          <div className="Navigation__header">
            <button onClick={() => onPageSelect(null)} />
            { page }
          </div>
        )}
        { page === 'puzzle' ? (
            <PuzzleNav problemSets={problemSets} onPuzzleSelect={onPuzzleSelect} />
          ) : (
            <div className="NavButtons">
              <button onClick={() => onPageSelect('puzzle')}> Puzzles </button>
              <button onClick={() => onPageSelect('generate')}> Generate </button>
            </div>
          )
        }
      </div>
    );
  }
}


