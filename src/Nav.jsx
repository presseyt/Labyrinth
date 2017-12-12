import React, {Component} from 'react';

class Nav extends Component{
  constructor(props){
    super(props);
    this.state = {puzzleSet: this.props.puzzleSet};
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
                    className={this.props.puzzle === j && this.props.puzzleSet === i ? "current" : p.solved ? "solved" : "not-current"}>
                    Problem {j+1}
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
      if (this.props.puzzleSet != i || this.props.puzzle != j){
        this.props.setPuzzle(i,j);
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