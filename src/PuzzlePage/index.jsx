const React = require('react');
const ReactDOM = require('react-dom');

import Puzzle from '../Puzzle/index.jsx';

require('./styles.scss');

export default class PuzzlePage extends React.Component {
  render() {
    const { puzzleId, puzzlesById } = this.props;
    return (
      <div className="PuzzlePage">
        <header className="PuzzlePage__header">
          {this.props.puzzleId}
          Rules
          Options
        </header>
        <Puzzle {...this.props} {...puzzlesById[puzzleId]} />
      </div>
    );
  }
}


