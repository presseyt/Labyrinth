const Labyrinth = require('./labyrinth.js');

class Generator {
  constructor(){
    this._directions = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ']
    this._oppositeDirections = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ']
    this._directionLetter = {
      'ArrowRight':'R',
       'ArrowLeft':'L',
       'ArrowDown':'D',
         'ArrowUp':'U',
               ' ': ' '
    }
  }

  solve(HT, puzzle){
    //given a hash table and a puzzle,
      //we generate the solution to the maze and some metadata (solInfo)
    let initialPosition = {x:puzzle._x, y: puzzle._y, mx:puzzle._mx, my: puzzle._my, path: ""};
    let queue = [initialPosition];
    let solutionInfo = {path: "", numSolutions: 0, count:0, numPositions:0};
    let p;
    while(p = queue.shift()){
      solutionInfo.count++;
      if (p.x == puzzle._ex && p.y == puzzle._ey){
        solutionInfo.path = solutionInfo.path ? solutionInfo.path : p.path;
        solutionInfo.numSolutions++;
        continue;
      }
      this._directions.forEach((dir,ind) => {
        puzzle._x = p.x; puzzle._y = p.y; puzzle._mx = p.mx; puzzle._my = p.my;
        if (puzzle.move(dir)){
          if (puzzle._x != puzzle._mx || puzzle._y != puzzle._my){
            if (HT[puzzle._x][puzzle._y][puzzle._mx][puzzle._my] !== puzzleNumber){
              let newPos = {x:puzzle._x, y: puzzle._y, mx:puzzle._mx, my: puzzle._my, path: p.path + this.directionsLetter[dir]};
              HT[puzzle._x][puzzle._y][puzzle._mx][puzzle._my] = puzzleNumber;
              queue.push(newPos);
              if (puzzle.move(this._oppositeDirections[ind]))
                if(puzzle._mx != p.mx || puzzle._my != p.my)
                  solutionInfo.numPositions++;
            }
          }
        }
      });
    }
    puzzle._x = initialPosition.x;
    puzzle._y = initialPosition.y;
    puzzle._mx = initialPosition.mx;
    puzzle._my = initialPosition.my;
    return solutionInfo;
  }



}