const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

export default class WinMessage extends React.Component {
  setRef = node => this.buttonRef = node;

  componentDidMount = () => this.buttonRef && this.buttonRef.focus();

  render() {
    return (
      <div className="WinMessage">
        <h2> You win! </h2>
        <button ref={this.setRef} onClick={() => alert('hi')}> Continue </button>
      </div>
    );
  }
}

