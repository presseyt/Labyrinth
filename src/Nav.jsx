import React, {Component} from 'react';

class Nav extends Component{
  constructor(props){
    super(props);
    this.state = {
      puzzleSet: 0,
      puzzle: 0
    };
  }

  render(){
    return (
      <aside className="col-sm-4 col-md-3 col-xl-2 sidebar">
        <ul>
          {this.props.problems.map( (problemSet,i) =>
            <li
              key={i}
              onClick={this.setExpanded(i)}>
              <h5>{problemSet.name}</h5>
              <ul className={this.state.puzzleSet === i ? "visible" : "hidden"}>
                {problemSet.problem.map((p,j) =>
                  <li
                    key={j}
                    onClick={this.setPuzzle(i,j)}
                    className={this.state.puzzle === j && this.state.puzzleSet === i ? "current" : p.solved ? "solved" : "not-current"}>
                    Problem {j}
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </aside>
    )
  }
  setPuzzle = (i,j) => {
    return (e) => {
      if (this.state.puzzleSet != i || this.state.puzzle != j){
        this.props.setPuzzle(i,j);
        this.setState({puzzleSet: i, puzzle: j});
      }
    };
  }

  setExpanded = (i) => {
    return (e) => {
      this.setState({puzzleSet: i});
    }
  }
}

export default Nav;