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

  checkMoveValidity(i,j) {
    const squares = this.state.squares.slice();
    var nextTurn = this.state.whiteIsNext ? 'O' : 'X';
    
    // Check if grid is filled or not, return false if already filled.
    if (squares[i][j] != null) {return false;}

    // Check if any adjacent squares is filled with opposite color or not, return false if no adjacent grids are filled.
    var hasAdjacentGridOfOppositeColor = false;
    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        var rowIndex = i + x;
        var colIndex = j + y;

        // Check if adjacent square in array is out of bounds, skip loop if out of bounds.
        if (!(rowIndex in squares)) {continue;};
        if (!(colIndex in squares[rowIndex])) {continue;};
        if (squares[rowIndex][colIndex] !== null && squares[rowIndex][colIndex] !== nextTurn) {
          hasAdjacentGridOfOppositeColor = true;
        }
      }
    }
    return hasAdjacentGridOfOppositeColor;
  }

  handleClick(i,j) {        
    const squares = this.state.squares.slice();
    if (!this.checkMoveValidity(i,j)) {return null;}
    squares[i][j] = this.state.whiteIsNext ? 'O' : 'X';    
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
