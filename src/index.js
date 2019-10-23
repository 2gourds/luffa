import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    var props = {
        className: 'square',
        onClick: () => this.props.onClick()
    }
    return React.createElement('button', props, this.props.value);
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: new Array(8).fill(null).map(() => new Array(8).fill(null)),
    };
  }

  handleClick(i,j) {        
    const squares = this.state.squares.slice();
    squares[i][j] = 'X';    
    this.setState({squares: squares});
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
