import React, {Component} from 'react';

class Nav extends Component{
  render(){
    return (
     <header className="navbar">
       <h1> {this.props.name} </h1>
       <ul>
        <li> <a href="/puzzle.html">Puzzles</a> </li>
        <li> <a href="/about.html">About</a> </li>
       </ul>
     </header>
    )
  }
}


export default Nav;