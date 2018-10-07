require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');

import Navigation from './Navigation/index.jsx';
import Puzzle from './Puzzle/index.jsx';
import PuzzleGenerator from './PuzzleGenerator/index.jsx';
import asdf from '../helpers/formatter.js'

const problemSetFinal = require('../db/finalfinalfinal.json');

require('./styles.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { puzzle: null };
  }

  handlePuzzleSelect = puzzle => this.setState({ puzzle })

  render() {
    const { puzzle } = this.state;
    console.log('PuzzleGenerator RENDER', this.state);
    return (
      <div className="App">
        <main>
          <PuzzleGenerator />
          </main>
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