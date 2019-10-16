require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');

const problemSetFinal = require('../db/finalfinalfinal.json');

import Navigation from './Navigation/index.jsx';
import Puzzle from './Puzzle/index.jsx';
import PuzzleGenerator from './PuzzleGenerator/index.jsx';
// import asdf from '../helpers/formatter.js'
const pages = {
    'home': Navigation,
    'puzzle': Puzzle,
    'gen': PuzzleGenerator
};

require('./styles.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'home', puzzle: null, problemSet: null };
  }

  handleProblemSetSelect = problemSet => this.setState({ problemSet })
  handlePuzzleSelect = puzzle => this.setState({ puzzle })
  handlePageSelect = page => this.setState({ page })
  handleNextPuzzle = () => {
      const { puzzle, problemSet } = this.state;
      if (!puzzle || !problemSet) return;
      const i = problemSet.problems.findIndex((x) => x === puzzle);
      if (i < 0) return;
      if (i >= problemSet.problems.length - 1) {
          return this.setState({ puzzle: null, problemSet: null, page: 'home' });
      }
      this.setState({ puzzle: problemSet.problems[i + 1]})
  }

  render() {
    const { page, puzzle, problemSet } = this.state;
    const Page = pages[page] || Navigation
    console.log('PuzzleGenerator RENDER', this.state);
    return (
      <div className="App">
        <Page
          problemSets={problemSetFinal}
          problemSet={problemSet}
          onPageSelect={this.handlePageSelect}
          onPuzzleSelect={this.handlePuzzleSelect}
          onProblemSetSelect={this.handleProblemSetSelect}
          onNextPuzzle={this.handleNextPuzzle}
          onPrevPuzzle={this.handlePrevPuzzle}
          puzzle={puzzle}
        />
      </div>
    );
    // );    return (
    //   <div className="App">
    //     <Navigation problemSets={problemSetFinal} onPuzzleSelect={this.handlePuzzleSelect} />
    //     <main>
    //       <Puzzle puzzle={puzzle} />
    //     </main>
    //   </div>
    // );
  }
}

ReactDOM.render(<App/>, document.getElementById('react-root'));


// ideas for alternate rules:
// - key to unlock exit
// - smarter minotaur?
// - squares where both minotaur and theseus move one square only
// - teleporter
// - squares which force you to move in one direction
// - 3d maze?