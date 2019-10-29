const React = require('react');
const ReactDOM = require('react-dom');

import Puzzle from '../Puzzle/index.jsx';

require('./styles.scss');

export default class PuzzlePage extends React.Component {
  constructor(props) {
      super(props);
      this.state = { modal: null };
  }
  render() {
    const { puzzleId, puzzlesById } = this.props;
    return (
      <div className="PuzzlePage">
        <header className="PuzzlePage__header">
          <div className="PuzzlePage__mini">{this.props.puzzleId}</div>
          <span className="PuzzlePage__left" onClick={() => this.props.onPageSelect('home')}>Home</span>
          <span onClick={() => this.setState({ modal: 'rules' })}>Rules</span>
          <span onClick={() => this.setState({ modal: 'options' })}>Options</span>
        </header>
        <Puzzle {...this.props} {...puzzlesById[puzzleId]} />
        {this.state.modal === 'rules' && (
            <div className="PuzzlePage__modal">
                <h2> Rules </h2>
                <ul>
                    <li>Reach the exit (green)</li>
                    <li>Control yourself (blue) with arrow keys, and space to pass</li>
                    <li>The minotaur (red) will chase you</li>
                    <li>He will always move towards you, and always move horizontally before vertically</li>
                </ul>
            </div>
        )}
        {this.state.modal === 'options' && (
            <div className="PuzzlePage__modal">
                <h2> Options </h2>
                None!
            </div>
        )}
      </div>
    );
  }
}


