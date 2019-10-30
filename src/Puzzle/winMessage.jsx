const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

export default class WinMessage extends React.Component {
  setRef = node => this.buttonRef = node;

  componentDidMount = () => this.buttonRef && this.buttonRef.focus();

  generateMessage = () => {
      if (this.props.attemps > 2 && this.props.numMoves === this.props.info.path && Math.random() > 0.6)
        return 'Attemp #' + this.props.attemps + ': Found the shortest solution.  Good job!'
      if (this.props.attempts > 2 && Math.random() > 0.6)
        return 'That was a hard one!  Good work!';
      if (this.props.attempts === 1 && this.props.numMoves === this.props.info.path && Math.random() > 0.3)
        return 'Shortest solution on the first try!  Nice!';
      if (this.props.numMoves === this.props.info.path && Math.random() > 0.5)
        return '...And you found the shortest solution.  Great!';
      if (this.props.attempts === 1 && Math.random() > 0.6)
        return 'First try!';
      if (Math.random() > 0.6)
        return 'Keep it up!'
      return 'Awesome!'
  }

  render() {
    return (
      <div className="Message">
        <h2> You win! </h2>
        <p>{this.generateMessage()}</p>
        <div className="Message__buttons">
            <button ref={this.setRef} onClick={this.props.onNextPuzzle || this.props.replay}> Continue </button>
            {this.props.onNextPuzzle && <button onClick={this.props.replay}> Replay </button>}
            <button onClick={() => this.props.onPageSelect('home')}> Home </button>
        </div>
      </div>
    );
  }
}

