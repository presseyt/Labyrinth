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
      moveQueue: [],
      isLost: false,
      isWon: false,
    };
  }

  componentDidMount = () => document.addEventListener('keydown', this.handleKeyPress);

  handleKeyPress = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { maze, moveQueue } = this.state;
    const { tx, ty, mx, my } = moveQueue[moveQueue.length - 1] || this.state;
    switch(e.code) {
      case 'ArrowLeft':
        if (maze[tx][ty][0]) {
          moveQueue.push({ tx: tx - 1, ty, mx, my });
          this.handleMinotaurMoves();
          this.handleMinotaurMoves();
        }
        break;
      case 'ArrowRight':
        if (maze[tx][ty][1]) {
          moveQueue.push({ tx: tx + 1, ty, mx, my });
          this.handleMinotaurMoves();
          this.handleMinotaurMoves();
        }
        break;
      case 'ArrowUp':
        if (maze[tx][ty][2]) {
          moveQueue.push({ tx, ty: ty - 1, mx, my });
          this.handleMinotaurMoves();
          this.handleMinotaurMoves();
        }
        break;
      case 'ArrowDown':
        if (maze[tx][ty][3]) {
          moveQueue.push({ tx, ty: ty + 1, mx, my });
          this.handleMinotaurMoves();
          this.handleMinotaurMoves();
        }
        break;
      case 'Space':
        this.handleMinotaurMoves();
        this.handleMinotaurMoves();
        break;
    }
    this.advanceState();
  }

  handleMinotaurMoves = () => {
    const { maze, moveQueue } = this.state;
    const { tx, ty, mx, my } = moveQueue[moveQueue.length - 1] || this.state;

    if (tx < mx && maze[mx][my][0]) {
      moveQueue.push({ tx, ty, mx: mx - 1, my });
    } else if (tx > mx && maze[mx][my][1]) {
      moveQueue.push({ tx, ty, mx: mx + 1, my });
    } else if (ty < my && maze[mx][my][2]) {
      moveQueue.push({ tx, ty, mx, my: my - 1 });
    } else if (ty > my && maze[mx][my][3]) {
      moveQueue.push({ tx, ty, mx, my: my + 1});
    }
  }
  advanceState = () => {
    const { ex, ey, moveQueue } = this.state;
    const nextState = moveQueue.shift();
    if (nextState) {
      this.setState(nextState);
      if (nextState.tx === nextState.mx && nextState.ty === nextState.my) {
        this.setState({ isLost: true });
      } else if (nextState.tx === ex && nextState.ty === ey &&
        (!moveQueue[0] || (nextState.mx === moveQueue[0].mx && nextState.my === moveQueue[0].my))) {
        this.setState({ isWon: true });
      } else {
        window.setTimeout(this.advanceState, 90);
      }
    }
  }

  render() {
    const { maze, width, height, tx, ty, mx, my, ex, ey, isLost, isWon } = this.state;
    console.log(isLost, isWon);
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
          <div className="Puzzle__Exit" style={{ left: `${100 * ex / width}%`, top: `${100 * ey / height}%`, width: `${100 / width}%`, height: `${100 / height}%` }} />
          <div className="Puzzle__Theseus" style={{ left: `${100 * tx / width}%`, top: `${100 * ty / height}%`, width: `${100 / width}%`, height: `${100 / height}%` }} />
          <div className="Puzzle__Minotaur" style={{ left: `${100 * mx / width}%`, top: `${100 * my / height}%`, width: `${100 / width}%`, height: `${100 / height}%` }} />
        </div>
        {isLost && <div className="LoseWindow"> You lost! </div>}
        {isWon && <div className="WinWindow"> You won! </div>}
      </div>
    );
  }
}


