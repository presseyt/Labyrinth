const React = require('react');
const ReactDOM = require('react-dom');

import classNames from '../../helpers/classNames';
import solve from '../../helpers/solver';

import WinMessage from './winMessage.jsx';
import LoseMessage from './loseMessage.jsx';

require('./styles.scss');

export default class Puzzle extends React.Component {
  constructor(props){
    super(props);
    this.state = this.getStateFromProps(props);
  }

  componentDidMount = () => document.addEventListener('keydown', this.handleKeyPress);
  componentWillUnmount = () => document.removeEventListener('keydown', this.handleKeyPress);

  handleKeyPress = (e) => {
    if (this.state.isWon || this.state.isLost) return;
    const { maze, moveQueue } = this.state;
    const { tx, ty, mx, my } = moveQueue[moveQueue.length - 1] || this.state;
    switch(e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        if (maze[tx][ty][0]) {
          moveQueue.push({ tx: tx - 1, ty, mx, my });
          this.handleMinotaurMoves();
          this.handleMinotaurMoves();
        }
        break;
      case 'ArrowRight':
      case 'KeyD':
        if (maze[tx][ty][1]) {
          moveQueue.push({ tx: tx + 1, ty, mx, my });
          this.handleMinotaurMoves();
          this.handleMinotaurMoves();
        }
        break;
      case 'ArrowUp':
      case 'KeyW':
        if (maze[tx][ty][2]) {
          moveQueue.push({ tx, ty: ty - 1, mx, my });
          this.handleMinotaurMoves();
          this.handleMinotaurMoves();
        }
        break;
      case 'ArrowDown':
      case 'KeyS':
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

  componentWillReceiveProps = (props) => this.setState(this.getStateFromProps(props))

  reset = () => this.setState(this.getStateFromProps(this.props));
  getStateFromProps = (props) => {
    return {
      maze: props.puzzle && props.puzzle[0],
      width: props.puzzle && props.puzzle[0].length,
      height: props.puzzle && props.puzzle[0][0].length,
      tx: props.puzzle && props.puzzle[1],
      ty: props.puzzle && props.puzzle[2],
      ex: props.puzzle && props.puzzle[3],
      ey: props.puzzle && props.puzzle[4],
      mx: props.puzzle && props.puzzle[5],
      my: props.puzzle && props.puzzle[6],
      moveQueue: [],
      isLost: false,
      isWon: false,
    };
  }

  render() {
    let { maze, width, height, tx, ty, mx, my, ex, ey, isLost, isWon, clientHeight, clientWidth } = this.state;
    clientHeight = clientHeight || document.body.clientHeight;
    clientWidth = clientWidth || document.body.clientWidth;
    const cellSize = 0.9 * Math.min(clientHeight / height, clientWidth / width);
    return (
      <div className="Puzzle" style={{ height: cellSize * height, width: cellSize * width }}>
          {
            maze && maze.map((row, i) => (
              <div className="Puzzle__column" key={i}>
                {
                  row.map((cell, j) => (
                    <div
                      key={j}
                      style={{ width: cellSize, height: cellSize }}
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
          <div className="Puzzle__Exit" style={{ left: cellSize * ex, top: cellSize * ey, width: cellSize, height: cellSize }} />
          <div className="Puzzle__Theseus" style={{ left: cellSize * (tx + 0.1), top: cellSize * (ty + 0.1), width: cellSize * 0.8, height: cellSize * 0.8 }} />
          <div className="Puzzle__Minotaur" style={{ left: cellSize * (mx + 0.1), top: cellSize * (my + 0.1), width: cellSize * 0.8 , height: cellSize * 0.8 }} />
          {isLost && <LoseMessage onClick={this.reset} />}
          {isWon && <WinMessage {...this.props} />}
      </div>
    );
  }
}


