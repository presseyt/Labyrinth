import React, {Component} from 'react';

class Nav extends Component{
  render(){
    return (
      <aside className="col-xs-4 col-md-3 col-xl-2 sidebar">
        <header>Problems</header>
        <ul>
          {this.props.problems.map( (p,i) => <li key={i}> Problem {i+1} </li> )}
        </ul>
      </aside>
    )
  }
}

export default Nav;