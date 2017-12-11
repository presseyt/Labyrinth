import React, {Component} from 'react';

class Content extends Component{
  render(){
    return (
      <div className="col-sm-8 col-md-9 col-xl-10">
        <h2>Current Puzzle</h2>
        <canvas id="canvas" width={600} height={400}> </canvas>
      </div>
    )
  }
}

export default Content;