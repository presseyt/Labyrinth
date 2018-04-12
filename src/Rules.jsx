import React, {Component} from 'react';

class Rules extends Component{
  constructor(props){
    super();
    this.state = {expanded: true};
  }
  render(){
    if (this.props.display)
      return (
        <div className="rulesContainer">
          <h5 onClick={this.toggleExpanded}>
            Rules
            <small>{this.state.expanded ? "[hide]" : "[show]"} </small>
          </h5>
          <ul className = {this.state.expanded ? "jumbotron" : "hidden"}>
            <li> Evade the minotaur and escape the maze. </li>
            <li> Use the <em>arrow keys</em> to move and the <em>space bar</em> to stay in place. </li>
            <li> The minotaur gets two moves to your one </li>
            <li> The minotaur will always chase you by moving towards you, </li>
            <li> and will always try to move horizontally before vertically.  Good luck! </li>
          </ul>
        </div>
      )
    return [];
  }

  toggleExpanded = () => {
    console.log('toggle expanded')
    this.setState({expanded: !this.state.expanded});
  }
}


export default Rules;