import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  var pr = {
      className: 'square',
      onClick: props.onClick
  }
  return React.createElement('button', pr, props.value);
}

function getArrayPosition(x,y) {
  // Returns the position of an array index x relative to a set position y.
  // If x < y, return -1
  // If x = y, return 0
  // If x > y, return 1
  if (x < y) {
    return -1;
  } else if (x > y) {
    return 1;
  } else {
    return 0;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    var gridCount = 8;
    this.state = {
      squares: new Array(gridCount).fill(null).map(() => new Array(gridCount).fill(null)),
      whiteIsNext: true,
    };

    // Set initial Board state.    
    this.state.squares[gridCount/2-1][gridCount/2-1] = 'O';
    this.state.squares[gridCount/2][gridCount/2] = 'O';
    this.state.squares[gridCount/2-1][gridCount/2] = 'X';
    this.state.squares[gridCount/2][gridCount/2-1] = 'X';
  }

  getOverturnableAdjacentGrids(i,j) {
    const squares = this.state.squares.slice();
    var nextTurn = this.state.whiteIsNext ? 'O' : 'X';
    
    // Check if grid is filled or not, return false if already filled.
    if (squares[i][j] != null) {return false;}

    // Check if any adjacent squares can be overturned or not, return false if no adjacent grids can be overturned.
    var overturnableAdjacentGrids = [];
    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        var rowIndex = i + x;
        var colIndex = j + y;

        // Check if adjacent square in array is out of bounds, skip loop if out of bounds.
        if (!(rowIndex in squares)) {continue;};
        if (!(colIndex in squares[rowIndex])) {continue;};
        if (squares[rowIndex][colIndex] !== null && squares[rowIndex][colIndex] !== nextTurn) {

          // Get the last index of the corresponding dimension.
          var lastRowIndex = i;
          if (rowIndex < i) {
             lastRowIndex = 0;
          } else if (rowIndex > i) {
             lastRowIndex = squares.length - 1;
          }

          var lastColIndex = j;
          if (colIndex < j) {
            lastColIndex = 0;
          } else if (colIndex > j) {
            lastColIndex = squares[0].length - 1;
          }

          // Get the array of grids from the selected position to the last grid towards the direction of the target adjacent square.          
          var xPos = rowIndex;
          var yPos = colIndex;          
          while (xPos !== lastRowIndex || yPos !== lastColIndex) {
            // Increment x-position until the last grid is reached (only if current position and the adjacent square is of different row).
            if (xPos > lastRowIndex) {
              xPos--;
            } else if (xPos < lastRowIndex) {
              xPos++;
            }

            // Increment y-position until the last grid is reached (only if current position and the adjacent square is of different column).
            if (yPos > lastColIndex) {
              yPos--;
            } else if (yPos < lastColIndex) {
              yPos++;
            }

            // Break loop if null grid is encountered.
            if (squares[xPos][yPos] === null) {
              break;
            }

            // Check if grid of the same color exists beyond the adjacent square.
            if (squares[xPos][yPos] === nextTurn) {
              var relativeRowIndex = getArrayPosition(lastRowIndex, i);
              var relativeColIndex = getArrayPosition(lastColIndex, j);
              overturnableAdjacentGrids.push([relativeRowIndex, relativeColIndex]);
              break;
            }
          }          
        }
      }
    }
    return overturnableAdjacentGrids;
  }

  handleClick(i,j) {        
    const squares = this.state.squares.slice();
    var grids = this.getOverturnableAdjacentGrids(i,j);
    if (!grids.length > 0) {
      // If no adjacent squares are overturnable, return do nothing.
      return null;
    }
    
    // Turn the current grid and all overturnable grids to the current turn state.
    var nextTurn = this.state.whiteIsNext ? 'O' : 'X';
    squares[i][j] = nextTurn;
    for (var index = 0; index < grids.length; index++) {
      // Get x and y relative positions from the overturnable grid array.
      var xRelPos = grids[index][0];
      var yRelPos = grids[index][1];
      console.log([i + xRelPos, j + yRelPos])
      while (squares[i + xRelPos][j + yRelPos] !== nextTurn) {
        squares[i + xRelPos][j + yRelPos] = nextTurn;
        xRelPos = xRelPos + grids[index][0];
        yRelPos = yRelPos + grids[index][1];
      }
    }
    this.setState({
      squares: squares,
      whiteIsNext: !this.state.whiteIsNext,
    });
  }

  renderSquare(i,j) {
    return (
      <Square
        key={i.toString()+j.toString()}
        value={this.state.squares[i][j]}
        onClick={() => this.handleClick(i,j)} 
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.whiteIsNext ? 'O' : 'X');

    // Create specific number of div elements for rows.
    var board = [];
    for (var i = 0; i < this.state.squares.length; i++) {
      // Create row of specific number of grids (8 as default).
      var row = [];
      for (var j = 0; j < this.state.squares[0].length; j++) {
        row.push(this.renderSquare(i,j));
      }

      var rowkey = i.toString() + j.toString();
      board.push(React.createElement('div', {className: 'board-row', key: rowkey}, row));
    }
    
    return React.createElement('div', null, 
      React.createElement('div', {className: 'status'}, status), board);
  }

}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
