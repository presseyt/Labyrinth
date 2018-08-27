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
        <Puzzle puzzle={problemSetFinal[0].problem[0]} />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('react-root'));


