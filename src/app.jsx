require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');

const puzzlesById = require('../db/ww.json');

import Navigation from './Navigation/index.jsx';
import PuzzlePage from './PuzzlePage/index.jsx';
import PuzzleGenerator from './PuzzleGenerator/index.jsx';
// import asdf from '../helpers/formatter.js'
const pages = {
    'home': Navigation,
    'puzzle': PuzzlePage,
    'generate': PuzzleGenerator
};

require('./styles.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'home', puzzleId: null, problemSet: null };
  }

  handleProblemSetSelect = problemSet => {
      this.setState({ problemSet, page: 'puzzle', puzzleId: problemSet[0] })
  }
  handlePageSelect = page => this.setState({ page })
  handleNextPuzzle = () => {
      const { puzzleId, problemSet } = this.state;
      if (!puzzleId || !problemSet) return;
      const i = problemSet.findIndex((id) => id === puzzleId);
      if (i < 0) return;
      if (i >= problemSet.length - 1) {
          return this.setState({ puzzleId: null, problemSet: null, page: 'home' });
      }
      console.log('HANDLE NEXT PUZZLE', problemSet[i + 1])
      this.setState({ puzzleId: problemSet[i + 1]})
  }


  render() {
    const { page, puzzleId, problemSet } = this.state;
    const Page = pages[page] || Navigation
    console.log('APP render', page, puzzleId, problemSet)
    return (
      <div className="App">
        <button onClick={this.handleNextPuzzle}>NEXT</button>
        <Page
          problemSet={problemSet}
          onPageSelect={this.handlePageSelect}
          onProblemSetSelect={this.handleProblemSetSelect}
          onNextPuzzle={this.handleNextPuzzle}
          puzzleId={puzzleId}
          puzzlesById={puzzlesById}
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