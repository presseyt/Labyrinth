import React, {Component} from 'react';

//initialize puzzle
const problemSet = require('../db/labyrinth.json');
const problemSetFinal = require('../db/final.json');
problemSet.push(...problemSetFinal);
// console.log('CP PS:', problemSet);

const Labyrinth = require('./labyrinth.js');


class Puzzle extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentPuzzle: new Labyrinth(...problemSet[this.props.i].problem[this.props.j])
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      currentPuzzle: new Labyrinth(...problemSet[nextProps.i].problem[nextProps.j])
    });
  }

  render(){
    return (
      <div className="col-sm-8 col-md-9 col-xl-10">
        <h2 id="FFFFF" style={{maxWidth:560}}>
          Current Puzzle: {this.props.j+1}
          <span style={{float:"right"}}>
            <span onClick={this.props.prevPuzzle}>⤆</span>
            <span onClick={this.props.nextPuzzle}>⤇</span>
          </span>
        </h2>
        <p> {problemSet[this.props.i].problem[this.props.j][7]} </p>
        <canvas id="canvas" width={600} height={400}> </canvas>
      </div>
    )
  }

  componentDidUpdate(){
    this.state.currentPuzzle.draw(canvas);
  }
  componentDidMount(){
    this.state.currentPuzzle.draw(canvas);
    window.addEventListener("keydown", e => {
      this.handleKeyDown(e);
    })
  }

  handleKeyDown (e) {
    e.preventDefault();
    if (this.state.currentPuzzle.move(e.key)){
      this.state.currentPuzzle.draw(canvas);
      if (this.state.currentPuzzle.win) window.setTimeout(() => {
        alert('You Win!');
        this.props.markSolved();
      }, 100);
      if (this.state.currentPuzzle.lost) window.setTimeout(() => {
        alert('You lost.');
        this.setState({
          currentPuzzle: new Labyrinth(...problemSet[this.props.i].problem[this.props.j])
        });
      }, 100);
    }
  }

}

export default Puzzle;