import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return React.createElement('button', {className: 'square'}, this.props.value);
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    var gridCount = 10;
    var row = [];
    for (var i = 0; i < gridCount; i++) {
      row.push(this.renderSquare(i));
    }
    return React.createElement('div', null, 
      React.createElement('div', {className: 'status'}, status),
      React.createElement('div', {className: 'board-row'}, row),
      React.createElement('div', {className: 'board-row'}, row),
      React.createElement('div', {className: 'board-row'}, row),
      React.createElement('div', {className: 'board-row'}, row),
      React.createElement('div', {className: 'board-row'}, row),
      React.createElement('div', {className: 'board-row'}, row),
      React.createElement('div', {className: 'board-row'}, row),
      React.createElement('div', {className: 'board-row'}, row),
      React.createElement('div', {className: 'board-row'}, row),
    );    
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
