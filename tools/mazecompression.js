
// //start up edmonton
//   //demo camp (may 9)

// //javascript may 5 6:30


// let uncompressed =
// `
// [   [[[false,false,false,true,true], [false,false,true,true,true], [false,true,true,true,true], [false,true,true,true,true], [false,false,true,true,true], [false,false,true,false,true], [false,true,false,false,true] ], [[false,true,false,true,true],[false,false,true,false,true],[true,true,false,true,true],[true,true,true,true,true],[false,true,true,true,true],[false,false,true,false,true],[true,true,false,false,true]],[[true,true,false,true,true],[false,false,true,true,true],[true,true,true,false,true],[true,false,false,true,true],[true,true,true,false,true],[false,false,false,true,true],[true,true,true,false,true]],[[true,true,false,true,true],[false,true,true,true,true],[true,false,true,true,true],[false,true,true,true,true],[true,true,true,true,true],[false,true,true,false,true],[true,true,false,false,true]],[[true,false,false,false,true],[true,true,false,true,true],[false,false,true,false,true],[true,true,false,false,true],[true,false,false,true,true],[true,false,true,true,true],[true,true,true,false,true]],[[false,true,false,true,true],[true,true,true,true,true],[false,true,true,true,true],[true,true,true,true,true],[false,true,true,true,true],[false,false,true,true,true],[true,true,true,false,true]],[[true,true,false,false,true],[true,false,false,false,true],[true,true,false,false,true],[true,false,false,true,true],[true,false,true,true,true],[false,true,true,false,true],[true,true,false,false,true]],[[true,true,false,true,true],[false,true,true,false,true],[true,false,false,true,true],[false,true,true,true,true],[false,true,true,true,true],[true,false,true,true,true],[true,true,true,false,true]],[[true,false,false,true,true],[true,false,true,true,true],[false,false,true,true,true],[true,false,true,false,true],[true,false,false,true,true],[false,false,true,false,true],[true,false,false,false,true]]],6,5,1,1,6,2]
// `;

// let compressed = '9x7 651162 bdhhdcefcnphcmndojobonhlhpgmincmjlofphphdomimjlgmngjhhlojldkjci'


// let encoder = [
//   ['[false,false,false,false,true]', 'a'],
//   ['[false,false,false,true,true]',  'b'],
//   ['[false,false,true,false,true]',  'c'],
//   ['[false,false,true,true,true]',   'd'],

//   ['[false,true,false,false,true]',  'e'],
//   ['[false,true,false,true,true]',   'f'],
//   ['[false,true,true,false,true]',   'g'],
//   ['[false,true,true,true,true]',    'h'],

//   ['[true,false,false,false,true]',  'i'],
//   ['[true,false,false,true,true]',   'j'],
//   ['[true,false,true,false,true]',   'k'],
//   ['[true,false,true,true,true]',    'l'],

//   ['[true,true,false,false,true]',   'm'],
//   ['[true,true,false,true,true]',    'n'],
//   ['[true,true,true,false,true]',    'o'],
//   ['[true,true,true,true,true]',     'p']
// ];

// //  //-------code to decrypt a compressed maze:

// let decoder = {
//   'a': [false,false,false,false,true],
//   'b': [false,false,false,true,true],
//   'c': [false,false,true,false,true],
//   'd': [false,false,true,true,true],
//   'e': [false,true,false,false,true],
//   'f': [false,true,false,true,true],
//   'g': [false,true,true,false,true],
//   'h': [false,true,true,true,true],
//   'i': [true,false,false,false,true],
//   'j': [true,false,false,true,true],
//   'k': [true,false,true,false,true],
//   'l': [true,false,true,true,true],
//   'm': [true,true,false,false,true],
//   'n': [true,true,false,true,true],
//   'o': [true,true,true,false,true],
//   'p': [true,true,true,true,true]
// }

// function compressedToUncompressed(compressed){}
//   let parts = compressed.split(' ');

//   let dimensions = parts[0].split('x');
//   let width = Number(dimensions[0]);
//   let height = Number(dimensions[1]);

//   let positions = parts[1].split('').map(x => parseInt(x,'16'));

//   let possibleMoves = [];
//   for(let i = 0; i < width; i++){
//     possibleMoves.push([]);
//     for(let j = 0; j < height; j++){
//       possibleMoves[i].push(decoder[parts[2][i*height+j]])
//     }
//   }

//   return = [possibleMoves, ...positions];
// }


// module.exports = {uncompress: compressedToUncompressed};



// //  //-------code to compress a maze:

// // let compressed = uncompressed;
// // let temp;
// // do{
// //   temp = compressed;
// //   encoder.forEach(x => compressed = compressed.replace(x[0], x[1]));
// // }while(temp !== compressed);

// // // compressed = compressed.replace(/10/g, 'a');
// // // compressed = compressed.replace(/11/g, 'b');
// // // compressed = compressed.replace(/12/g, 'c');
// // // compressed = compressed.replace(/13/g, 'd');


// // compressed = compressed.replace(/[\[\],]/g, '');


// // console.log(compressed);







