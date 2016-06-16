// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var arr = this.get(rowIndex);
      var counter = 0;

      for(var i = 0; i < arr.length; i++) {
          if(arr[i] !== 0) {
            counter++;
          }
      }

      if(counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      var numRows = this.get(0).length;
      var conflict = false;
      for(var i=0; i<numRows; i++){
        conflict = this.hasRowConflictAt(i);
        if(conflict){
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var numRows = this.get(0).length;
      var counter =0;
      for(var i = 0; i < numRows; i++){
        if(this.get(i)[colIndex] !== 0) {
          counter++;
        }
      }
      if(counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var numRows = this.get(0).length;
      var conflict = false;
      for (var i = 0; i < numRows; i++){
        conflict = this.hasColConflictAt(i);
        if(conflict) {
          return true;
        }
      }
      return false; // fixme
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) { //only runs down only one diagonal (a number = index position)
      var column = majorDiagonalColumnIndexAtFirstRow;
      var numRows = this.get(0).length;
      var counter = 0;
      var rowInd = 0;
      var length = 0;

      if(column < 0){
        rowInd = -column;
        column = 0;
        length = numRows - rowInd;
      } else{
        length = (numRows - column) - 1;
      }

      for(var i=rowInd;  i<=length; i++){
        //conditional
        //if there is a piece at that position, then increment the counter
        if(this.get(i)[column] !== 0){
          counter++;
        }

        column++;
      }

      if(counter > 1){
        return true;
      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var numRows = this.get(0).length;
      var diag;

      //traverses through all rows
      for(var i=0; i<numRows; i++){

        diag = this._getFirstRowColumnIndexForMajorDiagonalOn(i, 0);
        if(this.hasMajorDiagonalConflictAt(diag)){
            return true;
        }
      }

      //traverses through all columns
      for(var j=0; j<numRows; j++){

        diag = this._getFirstRowColumnIndexForMajorDiagonalOn(0, j);
        if(this.hasMajorDiagonalConflictAt(diag)){
            return true;
        }

      }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var column = minorDiagonalColumnIndexAtFirstRow;
      var numRows = this.get(0).length;
      var counter = 0;
      var rowInd = 0;
      var length = 0;

      if(column > numRows - 1){ //below the longest diagonal
        rowInd = (column - numRows) + 1 ;
        column = numRows - 1;
        length = numRows - 1;
      } else { // above the longest diagonal
        length = column;
      }

      for(var i=rowInd;  i<=length; i++){   //rowInd = 2, length = 2
        //conditional
        //if there is a piece at that position, then increment the counter
        if(this.get(i)[column] !== 0){
          counter++;
        }

        column--;
      }

      if(counter > 1){
        return true;
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var numRows = this.get(0).length;
      var diag;

      //traverses through all rows
      for(var i=0; i<numRows; i++){

        diag = this._getFirstRowColumnIndexForMinorDiagonalOn(i, numRows-1);
        if(this.hasMinorDiagonalConflictAt(diag)){
            return true;
        }
      }

      //traverses through all columns
      for(var j=numRows - 1; j >= 0 ; j--){ // j = 3 // j = 2

        diag = this._getFirstRowColumnIndexForMinorDiagonalOn(0, j);
        if(this.hasMinorDiagonalConflictAt(diag)){
            return true;
        }

      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
