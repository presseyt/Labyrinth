require('../styles/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');


//set up views
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import CurrentPuzzle from './CurrentPuzzle.jsx';

const problemSet = require('../db/labyrinth.json');
// const problemSetFinal = require('../db/final.json');
// problemSet.push(...problemSetFinal);

class App extends React.Component {
  constructor(){
    super();
    this.loadSavedProgress();
    let[i,j] = this.findFirstUnfinished();
    this.state = {i, j};
  }

  render() {
    return (
    <div>
      <Header name="Labyrinth"/>
      <div className="container-fluid">
        <div className="row">
          <Nav problems={problemSet}
               puzzleSet={this.state.i}
               puzzle={this.state.j}
               setPuzzle={this.setPuzzle}/>
          <CurrentPuzzle
              i={this.state.i}
              j={this.state.j}
              markSolved={this.markSolved}
              nextPuzzle={this.nextPuzzle}
              prevPuzzle={this.prevPuzzle}/>
        </div>
      </div>
    </div>);
  }

  markSolved = () => {
    problemSet[this.state.i].problem[this.state.j].solved = true;
    //save progress as a cookie:
    let progress = JSON.parse(document.cookie);
    progress.push([this.state.i, this.state.j]);
    document.cookie = JSON.stringify(progress);

    this.nextPuzzle();
  }

  nextPuzzle = () => {
    this.setPuzzle(this.state.i, this.state.j + 1)
  }

  prevPuzzle = () => {
    this.setPuzzle(this.state.i, this.state.j - 1)
  }

  setPuzzle = (i,j) => {
    if (problemSet[i] && problemSet[i].problem[j]){
      this.setState({i, j})
    }
  }
  loadSavedProgress = () => {
    try{
      let progress = JSON.parse(document.cookie);
      if (progress){
        progress.forEach( ([i,j]) => {
          if (problemSet[i] && problemSet[i].problem[j])
            problemSet[i].problem[j].solved = true;
        })
      }
    }
    catch (err){
      document.cookie = "[]";
      console.error(err);
    }
  }
  findFirstUnfinished(){
    let i = 0;
    let j = 0;
    while(problemSet[i].problem[j].solved){
      j++;
      if (!problemSet[i].problem[j]){
        if (problemSet[i+1]){
          i++;
          j=0;
        }
        else{
          break;
        }
      }
    }
    return [i,j];
  }
}

ReactDOM.render(<App/>, document.getElementById('react-root'));


