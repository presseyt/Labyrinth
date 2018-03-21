import React, {Component} from 'react';

class Nav extends Component{
  render(){
    return (
     <header className="navbar">
       <h1> {this.props.name} </h1>
     </header>
    )
  }
}


export default Nav;