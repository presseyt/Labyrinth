import React, {Component} from 'react';

class About extends Component{

  render(){
    if (this.props.display)
      return (
        <div className="rulesContainer">
          <h5>
            About
          </h5>
          <div className="jumbotron">
            <p>The first Theseus and the Minotaur maze (shown below) was designed by Ricard Abbot.  Since then, labyrinth mazes have grown in popularity and many people have enjoyed the mazes.  You can view a history of these mazes <a href="http://logicmazes.com"> here </a>.</p>
            <p>For the rules and a gentle start to the game, view the 'Tutorial' section.</p> <p>  The 'Challenge' section contains hand picked mazes which I consider to be the best mazes of each size.</p>  <p> A full list of mazes (orgaized by size) is also available.  All the mazes were created by a computer program I wrote. Enjoy! </p>
          </div>
        </div>
      )
    return [];
  }
}


export default About;