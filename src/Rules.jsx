import React, {Component} from 'react';

class Rules extends Component{
  constructor(props){
    super();
    this.state.expanded = true;
  }
  render(){
    if (this.props.display)
      return (
        <div>
          <h5> Rules </h5>
          <ul className = "rules">
            <li> Evade the minotaur and escape the maze. </li>
            <li> Use the <emph>arrow keys</emph> to move and the <emph>space bar</emph> to stay in place. </li>
            <li> The minotaur gets two moves to your one </li>
            <li> The minotaur will always chase you by moving towards you, </li>
            <li> and will always try to move horizontally before vertically.  Good luck! </li>
          </ul>
        </div>
      )
    return [];
  }
}


export default Rules;