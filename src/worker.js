const workercode = () => {
    function wallsToMoves(hwalls, vwalls){
      let width = hwalls[0].length;
      let height = vwalls.length;

      let possibleMoves=[];
      for(let i = 0; i < width; i++){
        possibleMoves.push([]);
        for(let j = 0; j < height; j++){
          possibleMoves[i].push([
            !(i == 0           || vwalls[j][i-1]),  //left
            !(i == width - 1   || vwalls[j][i]  ),  //right
            !(j == 0           || hwalls[j-1][i]),  //up
            !(j == height - 1  || hwalls[j][i]  ),  //down
            true                                    //stay
          ]);
        }
      }
      return possibleMoves
    }


    class Maze {
      constructor(possibleMoves, x, y, ex, ey){
        this._width = possibleMoves.length;
        this._height = possibleMoves[0].length;
        this._x = x;
        this._y = y;
        this._ex = ex;
        this._ey = ey;
        this._possibleMoves = possibleMoves;
      }
      print(){
        console.log(JSON.stringify([this._possibleMoves, this._x, this._y, this._ex, this._ey, this._mx, this._my]))
      }
      canMove(x,y,dir){
        switch (dir){
          case 'L':
            return this._possibleMoves[x][y][0];
          case 'R':
            return this._possibleMoves[x][y][1];
          case 'U':
            return this._possibleMoves[x][y][2];
          case 'D':
            return this._possibleMoves[x][y][3];
          case ' ':
            return this._possibleMoves[x][y][4];
        }
      }
      get height(){
        return this._height;
      }
      get width(){
        return this._width;
      }
      get win(){
        return this._x === this._ex && this._y === this._ey;
      }
      mutateH(i,j){
        this._possibleMoves[i][j][3] = !this._possibleMoves[i][j][3];
        this._possibleMoves[i][j+1][2] = !this._possibleMoves[i][j+1][2];
      }
      mutateV(i,j){
        this._possibleMoves[i][j][1] = !this._possibleMoves[i][j][1];
        this._possibleMoves[i+1][j][0] = !this._possibleMoves[i+1][j][0];
      }
      getSubmaze(i,j,q){
        //returns a new array consisting of all possible moves in the
          //quadrant q with corner (i,j)
        let submaze = [];
        switch (q){
          case 0:
            //top left
            for(let a = 0; a < i; a++){
              submaze.push([]);
              for(let b = 0; b < j; b++){
                submaze[a].push(this._possibleMoves[a][b]);
              }
            }
            break;
          case 1:
            for(let a = i; a < this.width; a++){
              submaze.push([]);
              for(let b = 0; b < j; b++){
                submaze[a-i].push(this._possibleMoves[a][b]);
              }
            }
            break;
          case 2:
            for(let a = i; a < this.width; a++){
              submaze.push([]);
              for(let b = j; b < this.height; b++){
                submaze[a-i].push(this._possibleMoves[a][b]);
              }
            }
            break;
          case 3:
            for(let a = 0; a < i; a++){
              submaze.push([]);
              for(let b = j; b < this.height; b++){
                submaze[a].push(this._possibleMoves[a][b]);
              }
            }
            break;
        }
        return submaze;
      }
      setSubmaze(submaze, i,j,q){
        //inverse of getSubmaze
        let a; let b;
        switch (q){
          case 0:
            for(a = 0; a < i - 1; a++){
              for(b = 0; b < j - 1; b++){
                this._possibleMoves[a][b] = submaze[a][b];
              }
              if (b > 0)
                this._possibleMoves[a][b][2] = submaze[a][b-1][3];
            }
            if (a > 0){
              for(b = 0; b < j - 1; b++){
                this._possibleMoves[a][b][0] = submaze[a-1][b][1];
              }
            }
            break;
          case 1:
            for(a = i + 1; a < this.width; a++){
              for(b = 0; b < j - 1; b++){
                this._possibleMoves[a][b] = submaze[a-i][b];
              }
              if (b > 0)
                this._possibleMoves[a][b][2] = submaze[a-i][b-1][3];
            }
            a = i;
            for(b = 0; b < j - 1; b++){
              this._possibleMoves[a][b][1] = submaze[1][b][0];
            }
            break;
          case 2:
            for(a = i + 1; a < this.width; a++){
              for(b = j+1; b < this.height; b++){
                this._possibleMoves[a][b] = submaze[a-i][b-j];
              }
              b = j;
              this._possibleMoves[a][b][3] = submaze[a-i][1][2];
            }
            a = i;
            for(b = j+1; b < this.height; b++){
              this._possibleMoves[a][b][1] = submaze[1][b-j][0];
            }
            break;
          case 3:
            for(a = 0; a < i-1; a++){
              for(b = j+1; b < this.height; b++){
                this._possibleMoves[a][b] = submaze[a][b-j];
              }
              b = j;
              this._possibleMoves[a][b][3] = submaze[a][1][2];
            }
            if (a > 0){
              for(b = j+1; b < this.height; b++){
                this._possibleMoves[a][b][0] = submaze[a-1][b-j][1];
              }
            }
            break;
        }
        return;
      }
    }

    class Game extends Maze{
      constructor(possibleMoves, x, y, ex, ey){
        super(possibleMoves, x, y, ex, ey);
        this._initialPosition = {x,y};
      }
      draw(){
        ctx.fillStyle = '#f9f7fb';
        // ctx.fillStyle = '#f1eadf';
        ctx.fillRect(0,0,500,500);
        ctx.strokeStyle = '#d9c9b9';
        ctx.strokeRect(0,0,500,500);
        ctx.strokeStyle = '#221100';

        let gridSize = Math.min(480 / this.width, 480 / this.height);
        var getCoords = (i,j) => [
          10 + i * gridSize,
          10 + j * gridSize
          ];

        //draw the maze:
        ctx.fillStyle = 'rgb(0,0,0)';
        let i;
        let j;
        for(i = 0; i < this._width; i++){
          for(j = 0; j < this._height; j++){
            ctx.beginPath();
            ctx.moveTo(...getCoords(i,j));
            if (this.canMove(i,j,'L'))
              ctx.moveTo(...getCoords(i, j+1));
            else
              ctx.lineTo(...getCoords(i, j+1));
            if (this.canMove(i,j,'D'))
              ctx.moveTo(...getCoords(i+1, j+1));
            else
              ctx.lineTo(...getCoords(i+1, j+1));
            if (this.canMove(i,j,'R'))
              ctx.moveTo(...getCoords(i+1, j));
            else
              ctx.lineTo(...getCoords(i+1, j));
            if (this.canMove(i,j,'U'))
              ctx.moveTo(...getCoords(i, j));
            else
              ctx.lineTo(...getCoords(i, j));
            ctx.stroke();

            ctx.fillRect(getCoords(i,j)[0] - 2, getCoords(i,j)[1] - 2,4,4);
          }
          ctx.fillRect(getCoords(i,j)[0] - 2, getCoords(i,j)[1] - 2,4,4);
        }
        for(j = 0; j < this._width; j++){
          ctx.fillRect(getCoords(i,j)[0] - 2, getCoords(i,j)[1] - 2,4,4);
        }
        ctx.fillRect(getCoords(i,j)[0] - 2, getCoords(i,j)[1] - 2,4,4);

        //draw the exit:
        ctx.fillStyle = 'rgb(130,250,130)';
        ctx.fillRect(getCoords(this._ex, this._ey)[0] + gridSize * 0.1,
                     getCoords(this._ex, this._ey)[1] + gridSize * 0.1,
                     gridSize * 0.8, gridSize * 0.8);
        //draw the person:
        ctx.fillStyle = 'rgb(100,100,200)';
        ctx.beginPath();
        let [x,y] = getCoords(this._x + 0.5, this._y + 0.5);
        ctx.arc(x,y,gridSize/3,0,6.29);
        ctx.fill();
      }
      move(dir){
        switch (dir){
          case 'L':
            if (this._possibleMoves[this._x][this._y][0]){this._x--; return true;}
            return false;
          case 'R':
            if(this._possibleMoves[this._x][this._y][1]){this._x++; return true;}
            return false;
          case 'U':
            if (this._possibleMoves[this._x][this._y][2]){this._y--; return true;}
            return false;
          case 'D':
            if (this._possibleMoves[this._x][this._y][3]){this._y++; return true};
            return false;
        }
        return true;
      }
    }

    class TheseusGame extends Game{
      constructor(possibleMoves, x, y, ex, ey, mx, my){
        super(possibleMoves, x, y, ex, ey);
        this._mx = mx;
        this._my = my;
        this._initialPosition = {x,y,mx,my};
      }
      move(dir){
        if(super.move(dir)){
          this._moveMinotaur();
          this._moveMinotaur();
          return true;
        }
        return false;
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
      }
      draw(){
        super.draw();
        let gridSize = Math.min(480 / this.width, 480 / this.height);
        var getCoords = (i,j) => [
          10 + i * gridSize,
          10 + j * gridSize
          ];
        //draw the minotaur:
        ctx.fillStyle = 'rgb(200,100,100)';
        ctx.beginPath();
        let [x,y] = getCoords(this._mx + 0.5, this._my + 0.5);
        ctx.arc(x,y,gridSize/3,0,6.29);
        ctx.fill();
      }
      get win(){ return super.win && !(this._x === this._mx && this._y === this._my); }
    }

    class TheseusSolver extends TheseusGame{
      constructor(possibleMoves, x, y, ex, ey, mx, my){
        super(possibleMoves, x, y, ex, ey, mx, my);
        this._dirs = ['L', 'R', 'U', 'D', ' '];
        this._oppositeDir = ['R','L', 'D', 'U', ' '];
      }
      solve(){
        let queue = [{x:this._x, y: this._y, mx:this._mx, my: this._my, path: ""}];
        let previous = [];
        let solutionInfo = {path: "", numSolutions: 0, count:0, numPositions:0};
        let p;
        while(p = queue.shift()){
          solutionInfo.count++;
          if (p.x == this._ex && p.y == this._ey){
            solutionInfo.path = solutionInfo.path ? solutionInfo.path : p.path;
            solutionInfo.numSolutions++;
            continue;
          }
          this._dirs.forEach((dir,ind) => {
            this._x = p.x; this._y = p.y; this._mx = p.mx; this._my = p.my;
            if (this.move(dir)){
              if (this._x != this._mx || this._y != this._my){
                let positionMatch = previous.find(pos => (pos.x === this._x && pos.y === this._y && pos.mx === this._mx && pos.my === this._my));
                if (!positionMatch){
                  let newPos = {x:this._x, y: this._y, mx:this._mx, my: this._my, path: p.path + dir};
                  if (this.move(this._oppositeDir[ind]))
                    if(this._x != this._mx && this._y != this._my && (this._mx != p.mx || this._my != p.my) )
                      solutionInfo.numPositions++;
                  previous.unshift(newPos);
                  queue.push(newPos);
                } else {
                  //NEED TO:
                    //check to see if positionMatch and p need to be
                    //grouped in the same equivalence class
                }
              }
            }
          });
        }
        this._x = this._initialPosition.x;
        this._y = this._initialPosition.y;
        this._mx = this._initialPosition.mx;
        this._my = this._initialPosition.my;
        //NEED TO: //CALCULATE DIFFICULTY BASED ON DIGRAPH
        return solutionInfo;
      }
      solveHashTable(HT, puzzleNumber){
        let queue = [{x:this._x, y: this._y, mx:this._mx, my: this._my, path: ""}];
        let solutionInfo = {path: "", numSolutions: 0, count:0, numPositions:0};
        let p;
        while(p = queue.shift()){
          solutionInfo.count++;
          if (p.x == this._ex && p.y == this._ey){
            solutionInfo.path = solutionInfo.path ? solutionInfo.path : p.path;
            solutionInfo.numSolutions++;
            continue;
          }
          this._dirs.forEach((dir,ind) => {
            this._x = p.x; this._y = p.y; this._mx = p.mx; this._my = p.my;
            if (this.move(dir)){
              if (this._x != this._mx || this._y != this._my){
                if (HT[this._x][this._y][this._mx][this._my] !== puzzleNumber){
                  let newPos = {x:this._x, y: this._y, mx:this._mx, my: this._my, path: p.path + dir};
                  HT[this._x][this._y][this._mx][this._my] = puzzleNumber;
                  queue.push(newPos);
                  if (this.move(this._oppositeDir[ind]))
                    if(this._mx != p.mx || this._my != p.my)
                      solutionInfo.numPositions++;
                }
              }
            }
          });
        }
        this._x = this._initialPosition.x;
        this._y = this._initialPosition.y;
        this._mx = this._initialPosition.mx;
        this._my = this._initialPosition.my;
        //NEED TO: //CALCULATE DIFFICULTY BASED ON DIGRAPH
        return solutionInfo;
      }
      solve2(){
        let queue = [{x:this._x, y: this._y, mx:this._mx, my: this._my, path: "", equivalenceClass: 0}];
        let nextEquivalenceClassNumber = 1;
        let diGraph = [[]];
        let previous = [{x:this._x, y: this._y, mx:this._mx, my: this._my, path: "", equivalenceClass: 0}];
        let solutionInfo = {path: ""};
        let p;
        while(p = queue.shift()){
          if (p.x == this._ex && p.y == this._ey){
            diGraph[p.equivalenceClass].push("win");
            solutionInfo.path = solutionInfo.path ? solutionInfo.path : p.path;
            continue;
          }
          this._dirs.forEach((dir,ind) => {
            this._x = p.x; this._y = p.y; this._mx = p.mx; this._my = p.my;
            if (this.move(dir)){
              if (this._x != this._mx || this._y != this._my){
                let positionMatch = previous.find(pos => (pos.x === this._x && pos.y === this._y && pos.mx === this._mx && pos.my === this._my));
                if (!positionMatch){
                  let newPos = {
                    x:this._x,
                    y: this._y,
                    mx:this._mx,
                    my: this._my,
                    path: p.path + dir,
                    equivalenceClass: p.equivalenceClass
                  };
                  if (this.move(this._oppositeDir[ind])){
                    if (this._mx != p.mx || this._my != p.my) {
                      newPos.equivalenceClass = nextEquivalenceClassNumber++;
                      diGraph.push([]);
                      diGraph[p.equivalenceClass].push(newPos.equivalenceClass);
                    }
                  }

                  previous.unshift(newPos);
                  queue.push(newPos);
                } else {
                  if (p.equivalenceClass !== positionMatch.equivalenceClass)
                    diGraph[p.equivalenceClass].push(positionMatch.equivalenceClass)
                }
              } else {
                diGraph[p.equivalenceClass].push("lose");
              }
            }
          });
        }
        this._x = this._initialPosition.x;
        this._y = this._initialPosition.y;
        this._mx = this._initialPosition.mx;
        this._my = this._initialPosition.my;
        return diGraph;
      }
      copy(){
        let newPossibleMoves = [];
        for(let i = 0; i < this._width; i++){
          newPossibleMoves.push([]);
          for(let j = 0; j < this._height; j++){
            newPossibleMoves[i].push([
              this._possibleMoves[i][j][0],  //left
              this._possibleMoves[i][j][1],  //right
              this._possibleMoves[i][j][2],  //up
              this._possibleMoves[i][j][3],  //down
              true                           //stay
            ]);
          }
        }
        return new TheseusSolver(newPossibleMoves, this._x, this._y, this._ex, this._ey, this._mx, this._my)
      }
    }

    class TheseusGenerator {
      constructor(width, height, pop, p_c, p_m, x, y, ex, ey, mx, my){
        this._width = width || 5;
        this._height = height || 4;
        this._pop = pop || 100;
        this._population = [];
        this._fitnesses = [];

        //for HashTable:
        this._HT = '0'.repeat(this._width).split('').map(x =>
          '0'.repeat(this._height).split('').map(x =>
            '0'.repeat(this._width).split('').map(x =>
              '0'.repeat(this._height).split(''))));
        this._puzzleNumber = 1;

        x = x != undefined ? x : Math.floor(Math.random() * this._width)
        y = y != undefined ? y : Math.floor(Math.random() * this._height)
        ex = ex != undefined ? ex : Math.floor(Math.random() * this._width)
        ey = ey != undefined ? ey : Math.floor(Math.random() * this._height)
        while(ex === x && ey === y){
          ex = Math.floor(Math.random() * this._width)
          ey = Math.floor(Math.random() * this._height)
        }
        mx = mx != undefined ? mx : Math.floor(Math.random() * this._width)
        my = my != undefined ? my : Math.floor(Math.random() * this._height)
        while(mx === x && my === y){
          mx = Math.floor(Math.random() * this._width)
          my = Math.floor(Math.random() * this._height)
        }
        for(let i = 0; i < this._pop; i++){
          this._population.push(this.generate(x,y,ex,ey,mx,my));
          this._fitnesses.push(1);
        }
        this._p_c = p_c || 0.002;
        this._p_m = p_m || 1 / (10 * this._width * this._height);
        // console.log(this._p_c, this._p_m);
        // this._iterations = iterations || 50;
        this._max_i = 0;
      }
      generate(x,y,ex,ey,mx,my){
        let hwalls = [];
        for(let i = 0; i < this._height - 1; i++) {
            hwalls[i] = [];
            for(let j = 0; j < this._width; j++) {
                hwalls[i].push(Math.random() < 0.3);
            }
        }
        let vwalls = [];
        for(let i = 0; i < this._height; i++) {
            vwalls[i] = [];
            for(let j = 0; j < this._width - 1; j++) {
                vwalls[i].push(Math.random() < 0.3);
            }
        }
        return new TheseusSolver(wallsToMoves(hwalls, vwalls), x, y, ex, ey, mx, my);
      }
      select(total_fitness){
        //TO-DO:  select two elements from the population

        let rnd = Math.random() * total_fitness;
        let i = -1;
        let total = 0;
        while(total <= rnd) total += this._fitnesses[++i];

        rnd = Math.random() * total_fitness;
        let j = -1;
        total = 0;
        while(total <= rnd) total += this._fitnesses[++j];

        return [this._population[i].copy(), this._population[j].copy()];
      }
      mutate(maze, p){
        p = p || this._p_m;
        //each wall has a small probability of changing
        let rnd; let i; let j;
        for(i = 0; i < maze.width; i++){
          for(j = 0; j < maze.height - 1; j++){
            rnd = Math.random();
            if (rnd < p)
              maze.mutateH(i,j);
          }
        }
        for(i = 0; i < maze.width - 1; i++){
          for(j = 0; j < maze.height; j++){
            rnd = Math.random();
            if (rnd < p)
              maze.mutateV(i,j);
          }
        }
      }
      crossover(maze1, maze2){
        let i = 1 + Math.floor(Math.random() * (this._width - 2));
        let j = 1 + Math.floor(Math.random() * (this._height - 2));
        let q = Math.floor(Math.random() * 4)

        let temp = maze1.getSubmaze(i,j,q);
        maze1.setSubmaze(maze2.getSubmaze(i,j,q),i,j,q);
        maze2.setSubmaze(temp, i,j,q);
      }
      run(){
        var newPopulation = [this._population[this._max_i].copy()];
        // this._fitnesses = this._population.map(x => this.score(x.solve(), x));
        let total_fitness = this._fitnesses.reduce((tot, x)=> tot + x) / this._pop;

        for(let i = 0; i < this._pop; i++){
          if (this._fitnesses[i] < total_fitness * 0.9){
            this._population.splice(i, 1);
            this._fitnesses.splice(i, 1);
            i--;
          } else {
            this._fitnesses[i] -= total_fitness * 0.8;
          }
        }
        total_fitness = this._fitnesses.reduce((tot, x)=> x ? tot + x : tot);


        while(newPopulation.length < this._pop){
          let [maze1, maze2] = this.select(total_fitness)
          if (Math.random() < this._p_c)
            this.crossover(maze1, maze2);
          this.mutate(maze1);
          this.mutate(maze2);
          newPopulation.push(maze1, maze2);
        }
        this._population = newPopulation;
        this._max_i = 0;
        for(let i = 0; i < this._pop; i++){
          // this._fitnesses[i] = this.score(this._population[i].solve(), this._population[i]);
          this._fitnesses[i] = this.score(this._population[i].solveHashTable(this._HT, this._puzzleNumber++), this._population[i]);
          if (this._fitnesses[i] > this._fitnesses[this._max_i]) this._max_i = i;
        }

        return this._max_i;
      }
      score(solutionInfo, maze){
        // First attempt:
        // return (solutionInfo.count + (solutionInfo.numSolutions == true ? 1 : 0) * 50 + 10 * solutionInfo.path.length * solutionInfo.path.length);
        // second try:
        // return (solutionInfo.count + solutionInfo.numSolutions * solutionInfo.path.length * solutionInfo.path.length);

        //Added numPositions:
        // return solutionInfo.numPositions * (solutionInfo.count + solutionInfo.path.length * solutionInfo.path.length);

        //Adding code below:
        let count = 0;
        let my1 = maze._my;
        let mx1 = maze._mx;
        let x1 = maze._x;
        let y1 = maze._y;
        let opposite = {L:'R', R:'L',U:'D',D:'U',' ':' '}; let mx; let my;
        let spaceCount = 0;
        for (let dir of solutionInfo.path){
          if (dir === ' ') spaceCount++;
          mx = maze._mx;
          my = maze._my;
          maze.move(dir)
          maze.move(opposite[dir])
          if (mx != maze._mx || my != maze._my) count++;
          maze._mx = mx;
          maze._my = my;
          maze.move(dir)
        }

        maze._my = my1;
        maze._mx = mx1;
        maze._y = y1;
        maze._x = x1;

        //first attempt:
        // return solutionInfo.count + solutionInfo.numPositions * 10 + solutionInfo.path.length * 5 + 100 * count * count;
        // second attempt
        // return (solutionInfo.count + solutionInfo.numPositions * 10 + solutionInfo.path.length * 5 + 100 * count * count) / (solutionInfo.numSolutions ? (solutionInfo.numSolutions + 25) : 25);
        //added spacecount for fun!
        // return (spaceCount + 1) * (solutionInfo.count + solutionInfo.numPositions * 10 + solutionInfo.path.length * 5 + 100 * count * count) / (solutionInfo.numSolutions ? (solutionInfo.numSolutions + 25) : 25);
        return (solutionInfo.count/2 + solutionInfo.numPositions * 10 + solutionInfo.path.length * 6 + 100 * count * count) / (solutionInfo.numSolutions ? (solutionInfo.numSolutions + 25) : 25);

      }
      scoreDigraph(d){
        d.win.constant = 1;
        d.lose.constant = 0;
        for(let i = d.length - 1; i >= 0; i--){

        }
      }
    }






    let TGenInitialValues;
    let gen;
    let level;
        //width,height,population=100,p_c=0.2,p_m=0.02, x,y,ex,ey,mx,my

    // for (let i = 0; i < 500; i++) {
    //   level = gen.run();
    //   m = gen._population[level];
    //   solInfo = m.solve()
    //   console.log(solInfo, solInfo.path.length, gen.score(solInfo, m), ++gen_run_counter);
    //   m.draw();
    // }

    let RUNNING = false;

    onmessage = function(e) {
      const { action, data } = e.data;
      console.log('in the webworker!', action, data);
      if (action === 'build' && !RUNNING) {
        RUNNING = true;
        TGenInitialValues = [data.width || 9, data.height || 9, data.pop || 200, data.p_c || 0.17, data.p_m || 0.016];
        gen = new TheseusGenerator(...TGenInitialValues);

        let previousDifficulty = 0;
        let epoch = 0;

        for(let noChangeCounter = 0; noChangeCounter < 250; noChangeCounter++){   //250
          level = gen.run();
          epoch += 1;
          if (previousDifficulty < gen._fitnesses[level]){
            previousDifficulty = gen._fitnesses[level];
            noChangeCounter = 0;
          }
          const maze = gen._population[level].copy();
          const solInfo = maze.solve();
          const difficulty = gen.score(solInfo, maze);
          postMessage({ action: 'running', maze, solInfo, difficulty, epoch });

        }
        RUNNING = false;
        postMessage({ action: 'done' });

      } else if (action === 'continue') {
        RUNNING = true;
        // const initialPuzzle = new TheseusSolver(...data.puzzle);
        const width = data.puzzle[0].length;
        const height = data.puzzle[0][0].length;
        TGenInitialValues = [width, height, data.pop || 200, data.p_c || 0.17, data.p_m || 0.016];
        gen = new TheseusGenerator(...TGenInitialValues);
        gen._population[0] = new TheseusSolver(...data.puzzle);

        let previousDifficulty = 0;
        let epoch = 0;

        for(let noChangeCounter = 0; noChangeCounter < 250; noChangeCounter++){   //250
          level = gen.run();
          epoch += 1;
          if (previousDifficulty < gen._fitnesses[level]){
            previousDifficulty = gen._fitnesses[level];
            noChangeCounter = 0;
          }
          const maze = gen._population[level].copy();
          const solInfo = maze.solve();
          const difficulty = gen.score(solInfo, maze);
          postMessage({ action: 'running', maze, solInfo, difficulty, epoch });

        }
        RUNNING = false;
        postMessage({ action: 'done' });
      }
    }
}

let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;


