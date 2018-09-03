require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');

import Puzzle from './Puzzle/index.jsx';

const problemSetFinal = require('../db/final.json');

class App extends React.Component {
  render() {
    console.log(problemSetFinal);
    return (
      <div style={{ width: 500, height: 500, margin: 'auto' }}>
        <Puzzle puzzle={problemSetFinal[1].problem[0]} />
      </div>
    );
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