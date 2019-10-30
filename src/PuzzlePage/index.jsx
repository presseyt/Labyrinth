const React = require('react');
const ReactDOM = require('react-dom');

import Puzzle from '../Puzzle/index.jsx';
import Modal from '../Modal/index.jsx';

require('./styles.scss');

export default class PuzzlePage extends React.Component {
  constructor(props) {
      super(props);
      this.state = { modal: null, silly: window.localStorage.getItem('silly') === 'true' };
  }
  closeModal = () => this.setState({ modal: null });
  render() {
    const { puzzleId, puzzlesById } = this.props;
    return (
      <div className="PuzzlePage">
        <header className="PuzzlePage__header">
          <div className="PuzzlePage__mini">{this.props.puzzleId}</div>
          <span className="PuzzlePage__left" onClick={() => this.props.onPageSelect('home')}>HOME</span>
          <span onClick={() => this.setState({ modal: 'rules' })}>RULES</span>
          <span onClick={() => this.setState({ modal: 'options' })}>OPTIONS</span>
        </header>
        <Puzzle key={puzzleId} {...this.state} {...this.props} {...puzzlesById[puzzleId]} />
        {this.state.modal === 'rules' && (
            <Modal onClose={this.closeModal} style={{ width: 325 }}>
                <div className="Message">
                    <h2> Rules </h2>
                    <ul>
                        <li>Reach the exit without being caught</li>
                        <li>Controls: arrow keys, and space (pass turn)</li>
                        <li>Red will always move towards you, and will travel <b>horizontally</b> before verically</li>
                    </ul>
                </div>
            </Modal>
        )}
        {this.state.modal === 'options' && (
            <Modal onClose={this.closeModal}>
                <div className="Message">
                    <h2> Options </h2>
                    <div>
                        <label htmlFor="silly"> Silly</label>
                        <input id="silly" type="checkbox" checked={this.state.silly} onChange={() => { window.localStorage.setItem('silly', !this.state.silly); this.setState({ silly: !this.state.silly }); } } />
                    </div>
                </div>
            </Modal>
        )}
      </div>
    );
  }
}


