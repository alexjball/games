import { registerEnumType } from "type-graphql"
import { TicTacToe } from "../graphql.generated"

export enum Player {
  X = "X",
  O = "O",
}
registerEnumType(Player, { name: "Player" })

export enum Status {
  PreGame = "PreGame",
  InProgress = "InProgress",
  XWon = "XWon",
  OWon = "OWon",
  Tie = "Tie",
}
registerEnumType(Status, { name: "Status" })

export enum Square {
  X = "X",
  O = "O",
  Empty = "Empty",
}
registerEnumType(Square, { name: "Square" })

export type Board = Square[][]

export class Game {
  private board: Board = this.initialBoard
  private status = Status.InProgress
  private starting = Player.X
  private turn = this.starting

  get state(): TicTacToe {
    return {
      board: this.board,
      status: this.status,
      turn: this.turn,
    }
  }

  get initialBoard(): Board {
    return [0, 1, 2].map(() => [0, 1, 2].map(() => Square.Empty))
  }

  newGame(start: Player) {
    this.board = this.initialBoard
    this.turn = start
    this.status = Status.InProgress
  }

  move(player: Player, row: number, col: number) {
    if (player !== this.turn) throw new Error("Not your turn")
    if (this.board[row][col] !== Square.Empty)
      throw new Error("Square is not empty")
    if (this.status !== Status.InProgress) throw new Error("Game is finished")

    this.board[row][col] = this.turn === Player.X ? Square.X : Square.O
    this.updateStatus()
    this.turn = this.turn === Player.X ? Player.O : Player.X
  }

  private updateStatus() {
    const win =
      // rows
      [0, 1, 2].some(r =>
        this.checkWin([
          [r, 0],
          [r, 1],
          [r, 2],
        ]),
      ) ||
      // columns
      [0, 1, 2].some(c =>
        this.checkWin([
          [0, c],
          [1, c],
          [2, c],
        ]),
      ) ||
      // diagonals
      [
        [0, 1, 2],
        [2, 1, 0],
      ].some(rows =>
        this.checkWin([
          [rows[0], 0],
          [rows[1], 1],
          [rows[2], 2],
        ]),
      )

    if (!win && !this.board.some(r => r.some(s => s === Square.Empty))) {
      this.status = Status.Tie
    }
  }

  private checkWin(coords: [number, number][]) {
    const squares = coords.map(([r, c]) => this.board[r][c])
    const winner = squares[0]
    const win = winner !== Square.Empty && squares.every(s => s === winner)
    if (win) this.status = winner === Square.X ? Status.XWon : Status.OWon
    return win
  }
}
