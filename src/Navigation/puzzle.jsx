const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

export default class PuzzleNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openProblemSet: null };
  }

  render() {
    const { problemSets } = this.props;
    return (
      <div className="PuzzleNav">
        {problemSets && problemSets.map(problemSet => (
          <React.Fragment key={problemSet.name}>
            <div
              className={`PuzzleNav__problemSet PuzzleNav__problemSet--${problemSet.difficulty}`}
              onClick={() => this.setState({ openProblemSet: this.state.openProblemset === problemSet.name ? null : problemSet.name })}
            >
              {this.state.openProblemSet === problemSet.name && (
                <div className="PuzzleNav__problemSetHighlight" />
              )}
              {problemSet.name}
            </div>
            {this.state.openProblemSet === problemSet.name && (
              <div className="PuzzleNav__openProblemSet">
                <div className="PuzzleNav__openProblemSetHighlight" />
                {problemSet.problems.map((problem, i) => (
                  <div
                    className="PuzzleNav__problem"
                    key={`problem-${i}`}
                    onClick={() => this.props.onPuzzleSelect(problem)}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
}


