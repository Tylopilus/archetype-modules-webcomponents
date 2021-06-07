import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-tictactoe',
  styleUrl: 'my-tictactoe.css',
  shadow: true,
})
export class MyTictactoe {
  @Prop()
  reset: string = 'reset';
  @State()
  board: undefined | string[][] = undefined;

  winner = undefined;
  gameOver = false;
  moves = 0;

  constructor() {
    this.board = this.updateBoard(this.board);
  }

  turn = 'X';

  private isEmpty = (board, row, col) => {
    return board[row][col] === '';
  };

  private setWinner = (winner: string) => {
    this.winner = winner;
  };
  private resetBoard = () => {
    this.board = this.updateBoard(undefined);
    this.winner = undefined;
    this.turn = 'X';
    this.moves = 0;
    this.gameOver = false;
  };
  private checkWinner = () => {
    let winner = undefined;

    for (let row = 0; row < 3; row++) {
      if (
        this.board[row][0] === this.board[row][1] &&
        this.board[row][0] === this.board[row][2] &&
        this.board[row][0]
      ) {
        winner = this.board[row][0];
      }
    }

    for (let col = 0; col < 3; col++) {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col] &&
        this.board[0][col]
      ) {
        winner = this.board[0][col];
      }
    }

    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2]
    ) {
      winner = this.board[0][0];
    }
    if (
      this.board[2][0] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0]
    ) {
      winner = this.board[2][0];
    }

    if (this.moves === 9 && !winner) winner = 'draw';
    return winner;
  };
  private updateBoard = (board, movePosRow?, movePosCol?) => {
    if (!board) {
      return [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
    }

    if (movePosRow !== undefined && movePosCol !== undefined) {
      if (!this.isEmpty(board, movePosRow, movePosCol)) return;
      this.board[movePosRow][movePosCol] = this.turn;
      this.board = [...this.board];
    }

    const winner = this.checkWinner();
    if (winner) {
      this.setWinner(winner);
      this.gameOver = true;
    }
  };
  private makeMove = (row: number, col: number) => {
    if (this.gameOver) return;
    this.moves++;
    this.updateBoard(this.board, row, col);
    this.turn = this.turn === 'X' ? 'O' : 'X';
  };

  render() {
    return (
      <div class="board">
        <button onClick={this.resetBoard}>{this.reset}</button>
        {this.winner && <span class="winner">Winner is: {this.winner}</span>}
        <table>
          <tbody>
            {this.board.map((row, rowIndex) => (
              <tr>
                {row.map((col, colIndex) => {
                  return (
                    <td onClick={() => this.makeMove(rowIndex, colIndex)}>
                      {col}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
