const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

export default class LoseMessage extends React.Component {
  setRef = node => this.buttonRef = node;

  componentDidMount = () => this.buttonRef && this.buttonRef.focus();

  render() {
    return (
      <div className="LoseMessage">
        You lose!
        <button ref={this.setRef} onClick={this.props.onClick}> Continue </button>
      </div>
    );
  }
}

