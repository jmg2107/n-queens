/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //var solution = undefined; //fixme
  //var solution = new Board({n: n}); // provides empty outer and inner arrays (all vals set to 0)
  var solution = []; //when returned, will be an array (whole board) of arrays (rows)
  //iterate through solution Board
    for(var i = 0; i < n; i++) { //
      var tempArr = [];
      for(var j = 0; j < n; j++) { // creates values for rows
        //create row array (tempArr) with placement of piece
        //ex: [1,0,0,0];
        if( i === j ) {
          tempArr.push(1);
        } else {
          tempArr.push(0);
        }
      }
      // outer loop is setting the tempArray at i position in board Array
      solution[i] = tempArr;
    }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //return pieces all down the longest major diagonal
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  //will work similarly to the decision tree
  //may have to use recursion -> rockPaperScissors solution
  //place 1 piece on row 0, iterate through possibilities of
  //next possible spots per row.

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  //seems to be another decision tree.
  //place one piece on 0,0
  //place second piece on 1,2
  //place third piece on 3,1

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  //decision tree similar
  //to recurseive countNRooksSolution

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
