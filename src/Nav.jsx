import React, {Component} from 'react';

class Nav extends Component{
  constructor(props){
    super(props);
    this.state = {open: [props.puzzleSet]};
  }

  isOpen(i){
    return this.state.open.find(x=>x===i) >= 0;
  }

  recursiveNav(arr){
    return (
      <ul>
        {arr.map( (problemSet,i) =>
          <li
            key={i}
            onClick={this.toggleExpanded(i)}>
            <h5>{problemSet.name}</h5>
            <ul className={this.isOpen(i) ? "visible" : "hidden"}>
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
    )
  }

  render(){
    return (
      <aside className="col-sm-4 col-md-3 col-xl-2 sidebar">
        {this.recursiveNav(this.props.problems)}
      </aside>
    )
  }

  setPuzzle = (i,j) => {
    return (e) => {
      e.stopPropagation()
      if (this.props.puzzleSet != i || this.props.puzzle != j){
        this.props.setPuzzle(i,j);
      }
    };
  }

  toggleExpanded = (i) => {
    return (e) => {
      if (this.isOpen(i)){
        this.state.open.splice(this.state.open.findIndex(x=>x===i),1)
      }else{
        this.state.open.push(i);
      }
      this.setState({open:[...this.state.open]});
    }
  }
}

export default Nav;