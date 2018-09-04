const MAX_WIDTH = 21;
const MAX_HEIGHT = 15;


const hashTable =
  Array.from({ length: MAX_WIDTH }, () =>
    Array.from({ length: MAX_HEIGHT }, () =>
      Array.from({ length: MAX_WIDTH }, () =>
        Array.from({ length: MAX_HEIGHT }, () => 0)
      )
    )
  );
let hashIndex = 0;

const moveChar = 'LRUDS';
const moveVectors = [[-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]];

function getNextPos(maze, pos, i) {
  const tx = pos.tx + moveVectors[i][0];
  const ty = pos.ty + moveVectors[i][1];
  let { mx, my } = pos;
  const path = pos.path + moveChar[i];

  if (tx < mx && maze[mx][my][0]) mx--;
  else if (tx > mx && maze[mx][my][1]) mx++;
  else if (ty < my && maze[mx][my][2]) my--;
  else if (ty > my && maze[mx][my][3]) my++;

  if (tx < mx && maze[mx][my][0]) mx--;
  else if (tx > mx && maze[mx][my][1]) mx++;
  else if (ty < my && maze[mx][my][2]) my--;
  else if (ty > my && maze[mx][my][3]) my++;

  return { tx, ty, mx, my, path };
}

export default function solve(puzzle) {
  const maze = puzzle[0];
  const ex = puzzle[3];
  const ey = puzzle[4];
  const stack = [{ tx: puzzle[1], ty: puzzle[2], mx: puzzle[5], my: puzzle[6], path: '' }];
  hashTable[puzzle[1]][puzzle[2]][puzzle[5]][puzzle[6]] = ++hashIndex;
  const solInfo = { };

  while (stack.length) {
    const pos = stack.shift();
    const { tx, ty, mx, my } = pos;
    maze[tx][ty].forEach((canMove, i) => {
      if (canMove) {
        const nextPos = getNextPos(maze, pos, i);
        if (hashTable[nextPos.tx][nextPos.ty][nextPos.mx][nextPos.my] !== hashIndex) {
          hashTable[nextPos.tx][nextPos.ty][nextPos.mx][nextPos.my] = hashIndex;
          if (nextPos.tx !== nextPos.mx || nextPos.ty !== nextPos.my) {
            stack.push(nextPos);
            if (nextPos.tx === ex && nextPos.ty === ey && !solInfo.path) solInfo.path = nextPos.path;
          }
        }
      }
    });
  }
  return solInfo;
}