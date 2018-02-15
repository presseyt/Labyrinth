require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');


//set up views
import Header from './Header.jsx';

class App extends React.Component {

  render() {
    return (
    <div>
      <Header name="Labyrinth"/>
      <div className="container-fluid">
        <div className="row">
          <div> About that... </div>
        </div>
      </div>
    </div>);
  }


}

ReactDOM.render(<App/>, document.getElementById('react-root'));


