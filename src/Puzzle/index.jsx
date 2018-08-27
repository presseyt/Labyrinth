const React = require('react');
const ReactDOM = require('react-dom');

import classNames from '../../helpers/classNames';

require('./styles.scss');

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      maze: props.puzzle[0],
      width: props.puzzle[0].length,
      height: props.puzzle[0][0].length,
      tx: props.puzzle[1],
      ty: props.puzzle[2],
      ex: props.puzzle[3],
      ey: props.puzzle[4],
      mx: props.puzzle[5],
      my: props.puzzle[6],
    };
  }

  render() {
    const { maze, width, height } = this.state;
    console.log(maze);
    return (
      <div className="Puzzle">
        <div className="Puzzle__container" style={{ maxWidth: `${100 * width/height}%`, maxHeight: `${100 * height/width}%`}}>
          {
            maze.map((row, i) => (
              <div className="Puzzle__column" key={i}>
                {
                  row.map((cell, j) => (
                    <div
                      key={j}
                      className={classNames('Puzzle__cell', {
                        'Puzzle__cell--dark': (i + j) % 2 === 0,
                        'Puzzle__cell--light': (i + j) % 2 === 1,
                      })}
                    >
                      {!cell[0] && i > 0 && <div className='Puzzle__wall Puzzle__wall--left' />}
                      {!cell[2] && j > 0 && <div className='Puzzle__wall Puzzle__wall--top' />}
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}


