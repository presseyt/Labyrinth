
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-'

export default function asdf(problemSets) {
  problemSets.forEach(problemset => {
    (problemset.problems || problemset.problem).forEach(problem => {
      const puzzle = problem[0];
      const width = puzzle.length;
      const height = puzzle[0].length;
      const encodedString = `${width}x${height},`;

      const binaryArr = [];
      for (let i = 0; i < width; i++) {
        const verticalWalls = [];
        for (let j = 0; j < height; j++) {
          verticalWalls.push(!puzzle[i][j][1]);
          if (j !== height - 1) binaryArr.push(!puzzle[i][j][3]);
        }
        if (i !== width - 1) binaryArr.concat(verticalWalls)
      }

    });
  });
}