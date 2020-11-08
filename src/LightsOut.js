import React, { Component } from "react";
import Box from "./Box";
import "./LightsOut.css";

class LightsOut extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightsOnStart: 0.25,
  };

  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false,
    };
    this.flipNeighbors = this.flipNeighbors.bind(this);
  }

  // Returns a 2-D array of nrows x ncols, where each cell is randomly true or false
  createBoard() {
    return Array.from({ length: this.props.nrows }, () =>
      Array.from(
        { length: this.props.nrows },
        () => Math.random() < this.props.chanceLightsOnStart
      )
    );
  }

  flipNeighbors(index) {
    const [r, c] = index.split("-").map(Number);

    this.setState((st) => {
      // Creating a copy of the current board
      const newBoard = st.board.map((x) => [...x]);

      // Flipping itself
      newBoard[r][c] = !st.board[r][c];
      // Flipping all neighbors
      if (r - 1 >= 0) newBoard[r - 1][c] = !st.board[r - 1][c];
      if (r + 1 < 5) newBoard[r + 1][c] = !st.board[r + 1][c];
      if (c - 1 >= 0) newBoard[r][c - 1] = !st.board[r][c - 1];
      if (c + 1 < 5) newBoard[r][c + 1] = !st.board[r][c + 1];

      const won = newBoard.every((row) => row.every((cell) => !cell));
      return { board: newBoard, hasWon: won };
    });
  }

  makeTable() {
    return this.state.board.map((r, rIdx) => (
      <tr key={rIdx}>
        {r.map((c, cIdx) => (
          <Box
            isLit={c}
            pos={`${rIdx}-${cIdx}`}
            key={`${rIdx}-${cIdx}`}
            toggleColor={this.flipNeighbors}
          />
        ))}
      </tr>
    ));
  }

  render() {
    return (
      <div className="LightsOut">
        {this.state.hasWon ? (
          <div className="LightsOut-win">
            <div className="neon-orange">You</div>
            <div className="neon-blue">Win!</div>
          </div>
        ) : (
          <>
            <div className="LightsOut-title">
              <span className="neon-orange">Lights</span>
              <span className="neon-blue">Out</span>
            </div>
            <table className="LightsOut-board">
              <tbody>{this.makeTable()}</tbody>
            </table>
          </>
        )}
      </div>
    );
  }
}

export default LightsOut;
