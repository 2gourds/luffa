import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    var props = {
        className: 'square',
        onClick: () => this.setState({value: 'X'})
    }
    return React.createElement('button', props, this.state.value);
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(8).fill(Array(8).fill(null)),
    };
  }

  renderSquare(i,j) {
    return <Square value={this.state.squares[i][j]} />;
  }

  render() {
    const status = 'Next player: X';
    var gridCount = 8;

    // Create specific number of div elements for rows.
    var board = [];
    for (var i = 0; i < gridCount; i++) {
      // Create row of specific number of grids (8 as default).
      var row = [];
      for (var j = 0; j < gridCount; j++) {
        row.push(this.renderSquare(i,j));
      }

      board.push(React.createElement('div', {className: 'board-row'}, row));
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
