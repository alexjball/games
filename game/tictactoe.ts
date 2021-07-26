import { immerable } from "immer"

export class TicTacToe {
  [immerable] = true

  readonly size = shape.size
  currentMarker: Marker = "X"
  board: Square[][] = this.empty()
  validMoves: Location[] = []
  status: Status = "in-progress"

  newGame(first: Marker) {
    this.status = "in-progress"
    this.currentMarker = first
    this.board = this.empty()
    this.updateValidMoves()
  }

  updateValidMoves() {
    this.validMoves = []
    if (this.status === "in-progress") {
      this.board.forEach((r, rI) =>
        r.forEach((s, cI) => !s && this.validMoves.push([rI, cI]))
      )
    }
  }

  forEachSquare(f: (s: Square) => void) {
    this.board.forEach(r => r.forEach(f))
  }

  empty() {
    return Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null))
  }

  updateStatus() {
    for (let c of shape.winningLocations) {
      const markers = c.map(([r, c]) => this.board[r][c])
      if (
        markers.every(m => m !== null) &&
        markers.every(m => m === markers[0])
      ) {
        this.status = markers[0] === "X" ? "win-X" : "win-O"
        return
      }
    }
    if (this.board.every(r => r.every(m => m !== null))) {
      this.status = "tie"
    }
  }

  move(r: number, c: number) {
    if (this.status !== "in-progress") {
      throw "game is done"
    } else if (r < 0 || c < 0 || c >= this.size || r >= this.size) {
      throw `invalid square ${r}, ${c}`
    } else if (this.board[r][c]) {
      throw `square already occupied ${r}, ${c}`
    }

    this.board[r][c] = this.currentMarker
    this.currentMarker = otherMarker(this.currentMarker)
    this.updateStatus()
    this.updateValidMoves()
  }
}

export const otherMarker = (m: Marker) => (m === "X" ? "O" : "X")
export type Status = "empty" | "in-progress" | "win-X" | "win-O" | "tie"
export type Marker = "X" | "O"
export type Square = Marker | null
export type Location = [number, number]

const shape = {
  size: 3,
  winningLocations: [
    [
      // Top horizontal
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      // Middle horizontal
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      // Bottom horizontal
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      // Left vertical
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      // Middle vertical
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      // Right vertical
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      // Top-left diagonal
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      // Bottom-left diagonal
      [2, 0],
      [1, 1],
      [0, 2],
    ],
  ],
}
