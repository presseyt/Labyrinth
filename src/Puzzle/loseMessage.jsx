const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

export default class LoseMessage extends React.Component {
  setRef = node => this.buttonRef = node;

  componentDidMount = () => this.buttonRef && this.buttonRef.focus();

  generateMessage = () => {
      console.log(this.props)
      if (this.props.ex === this.props.mx && Math.random() > 0.2)
        return 'You have to reach your goal before you are caught!';
      if (this.props.attempts > 3 && Math.random() > 0.4)
          return 'This is a tough one!';
      if (Math.random() > 0.7)
        return 'I wish there was an undo.';
      if (Math.abs(this.props.ex - this.props.x) < 1 && Math.abs(this.props.ey - this.props.y) < 1 && Math.random() > 0.3)
        return "So close!  You'll get it next time."
      if (Math.random() > 0.5)
        return 'You can do it!';
      return 'Better luck next time.'
  }

  render() {
    return (
      <div className="Message">
        <h2> You lose! </h2>
        <p>{this.generateMessage()}</p>
        <div className="Message__buttons">
            <button ref={this.setRef} onClick={this.props.replay}> Try again </button>
            <button onClick={() => this.props.onPageSelect('home')}> Home </button>
        </div>
      </div>
    );
  }
}

