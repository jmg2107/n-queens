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
  //solution is the entire board
  var solution = new Board({n:n}); //fixme
  // place in stack, increment when we reach the last row of the stack
  var counter = 0;

  var recurseBoard = function(currentRowInd){

    //base case
    if(currentRowInd === n){
      counter++;
      return;
    }

    for(var i=0; i<n; i++){

      //place the piece
      solution.togglePiece(currentRowInd, i);

      //check if we can place a token at this position
      if(!solution.hasAnyRooksConflicts()){
      //recurse
        recurseBoard(currentRowInd+1, i);
      }

      //take the piece off
      solution.togglePiece(currentRowInd, i);
    }

  }
  //will work similarly to the decision tree
  //may have to use recursion -> rockPaperScissors solution
  //place 1 piece on row 0, iterate through possibilities of
  //next possible spots per row.

  recurseBoard(0);

  console.log('Number of solutions for ' + n + ' rooks:', counter);
  return counter;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  //solution is the entire board
  var solution = new Board({n:n}); //fixme
  var result = [];

  var recurseBoard = function(currentRowInd){

    //base case
    if(currentRowInd === n){

      for(var i=0; i<n; i++){
        var tempArr = solution.get(i);
        var row = []
        for(var j=0; j<n; j++){
          row.push(tempArr[j]);
        }
        result[i]= row;

      }
      return;

    }

    for(var i=0; i<n; i++){

      //place the piece
      solution.togglePiece(currentRowInd, i);

      //check if we can place a token at this position
      if(!solution.hasAnyQueensConflicts()){
      //recurse
         recurseBoard(currentRowInd+1, i);
      }

      //take the piece off
      solution.togglePiece(currentRowInd, i);
    }

  }
  //will work similarly to the decision tree
  //may have to use recursion -> rockPaperScissors solution
  //place 1 piece on row 0, iterate through possibilities of
  //next possible spots per row.

  recurseBoard(0);

  //we found no solution
  if(result.length === 0){
    result = solution.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return result;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
   //solution is the entire board
  var solution = new Board({n:n}); //fixme
  // place in stack, increment when we reach the last row of the stack
  var counter = 0;

  var recurseBoard = function(currentRowInd){

    //base case
    if(currentRowInd === n){
      counter++;
      console.log(n + " board is " + solution.rows());
      return;
    }

    for(var i=0; i<n; i++){

      //place the piece
      solution.togglePiece(currentRowInd, i);

      //check if we can place a token at this position
      if(!solution.hasAnyQueensConflicts()){
      //recurse
        recurseBoard(currentRowInd+1, i);
      }

      //take the piece off
      solution.togglePiece(currentRowInd, i);
    }

  }
  //will work similarly to the decision tree
  //may have to use recursion -> rockPaperScissors solution
  //place 1 piece on row 0, iterate through possibilities of
  //next possible spots per row.

  recurseBoard(0);

  console.log('Number of solutions for ' + n + ' queens:', counter);
  return counter;

  //decision tree similar
  //to recurseive countNRooksSolution

};
