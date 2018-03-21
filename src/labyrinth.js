module.exports = class labyrinthGame{
  constructor(possibleMoves, x,y,ex,ey,mx,my){
    this._x  = x;
    this._y  = y;
    this._ex = ex;
    this._ey = ey;
    this._mx = mx;
    this._my = my;
    this._possibleMoves = possibleMoves;

    this._initialPos = {x,y,mx,my};
  }
  get width(){
    return this._possibleMoves.length;
  }
  get height(){
    return this._possibleMoves[0].length;
  }
  draw(canvas){
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.globalAlpha = 1;
    let width = Math.min(600, 400 * this.width / this.height);
    let height = Math.min(400, 600 * this.height / this.width);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    let getCoords = (x,y) => {
      return [x * 600/this.width, y * 400/this.height]
    }


    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,600,400);

    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    for(let i = 0; i < this.width; i++){
      for(let j = 0; j < this.height; j++){
        ctx.moveTo(...getCoords(i,j));
        if (this._possibleMoves[i][j][0]){
          ctx.moveTo(...getCoords(i,j+1))
        } else {
          ctx.lineTo(...getCoords(i,j+1))
        }
        if (this._possibleMoves[i][j][3]){
          ctx.moveTo(...getCoords(i+1,j+1))
        } else {
          ctx.lineTo(...getCoords(i+1,j+1))
        }
        if (this._possibleMoves[i][j][1]){
          ctx.moveTo(...getCoords(i+1,j))
        } else {
          ctx.lineTo(...getCoords(i+1,j))
        }
        if (this._possibleMoves[i][j][2]){
          ctx.moveTo(...getCoords(i,j))
        } else {
          ctx.lineTo(...getCoords(i,j))
        }
      }
    }
    ctx.stroke();

    ctx.fillStyle = '#66ff66';
    ctx.fillRect(...getCoords(this._ex + 0.05, this._ey + 0.05), 600 * 0.9 / this.width, 400 * 0.9 / this.height)

    ctx.fillStyle = '#3333ff';
    ctx.beginPath();
    ctx.ellipse(...getCoords(this._x + 0.5, this._y + 0.5), 600 * 0.4 / this.width, 400 * 0.4 / this.height, 0, 0, 6.3);
    ctx.fill();

    ctx.fillStyle = '#ff3333';
    ctx.beginPath();
    ctx.ellipse(...getCoords(this._mx + 0.5, this._my + 0.5), 600 * 0.4 / this.width, 400 * 0.4 / this.height, 0, 0, 6.3);
    ctx.fill();
  }
  move(dir){
    switch (dir){
      case 'ArrowRight':
        if (this._possibleMoves[this._x][this._y][1]){
          this._x++;
          break;
        }
        return;
      case 'ArrowLeft':
        if (this._possibleMoves[this._x][this._y][0]){
          this._x--;
          break;
        }
        return;
      case 'ArrowUp':
        if (this._possibleMoves[this._x][this._y][2]){
          this._y--;
          break;
        }
        return;
      case 'ArrowDown':
        if (this._possibleMoves[this._x][this._y][3]){
          this._y++;
          break;
        }
        return;
      case ' ':
        break;
      default:
        return;
    }
    this._moveMinotaur();
    this._moveMinotaur();
    return true;
  }
  get win(){
    return (!this.lost) && this._x === this._ex && this._y === this._ey;
  }
  get lost(){
    return this._x === this._mx && this._y === this._my;
  }
  _moveMinotaur(){
    if (this._x < this._mx)
      if (this._possibleMoves[this._mx][this._my][0]){
        this._mx--;
        return true;
      }
    if (this._x > this._mx)
      if (this._possibleMoves[this._mx][this._my][1]){
        this._mx++;
        return true;
      }
    if (this._y < this._my)
      if (this._possibleMoves[this._mx][this._my][2]){
        this._my--;
        return true;
      }
    if (this._y > this._my)
      if (this._possibleMoves[this._mx][this._my][3]){
        this._my++;
        return true;
      }
    return false;
  }
  reset(){
    this._x = this._initialPos.x;
    this._y = this._initialPos.y;
    this._mx = this._initialPos.mx;
    this._my = this._initialPos.my;
  }
}