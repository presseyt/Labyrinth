const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

export default class LoseMessage extends React.Component {
  setRef = node => this.buttonRef = node;

  componentDidMount = () => this.buttonRef && this.buttonRef.focus();

  render() {
    return (
      <div className="LoseMessage">
        <h2> You lose! </h2>
        <button ref={this.setRef} onClick={this.props.onClick}> Try again </button>
      </div>
    );
  }
}

