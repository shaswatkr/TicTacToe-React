import React, { Component } from "react";
import "./TicTacToe.css";
import Game from "./Game";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const len = lines.length;
  for (let i = 0; i < len; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class TicTacToe extends Component {
  state = {
    xIsNext: true,
    stepNumber: 0,
    history: [{ squares: Array(9).fill(null) }]
  };

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button
            className="button btn-warning m-1"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    let style = "badge badge-";
    if (winner) {
      status = "Winner Is: " + winner;
      style += "success m-3";
    } else {
      status = "Player turn: " + (this.state.xIsNext ? "X" : "O");
      style += "info";
    }

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Game
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div style={{ fontSize: 25 }} className={style}>
              {status}
            </div>
            <ol> {moves} </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default TicTacToe;