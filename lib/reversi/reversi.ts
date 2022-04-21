export type Stone = "black" | "white"
export type SquareState = "empty" | Stone
export type Row = SquareState[]
export type Location = [number, number]
export interface GameState {
  state: ReversiState
  board: Row[]
  currentStone: Stone
  validMoves: Location[]
  lastMove?: Move
  blackScore: number
  whiteScore: number
}

export type Direction = -1 | 0 | 1
export type NeighborVisitor = (
  dR: Direction,
  dC: Direction,
  s: SquareState,
) => void
export type BoardVisitor = (r: number, c: number, s: SquareState) => void
export type Move = { r: number; c: number; s: Stone }[]
export const otherStone = (a: Stone): Stone =>
  a === "black" ? "white" : "black"

export class Board {
  readonly size = 8
  squares: Row[]

  constructor() {
    this.squares = this.empty()
  }

  reset() {
    this.squares = this.empty()
  }

  move(a: Stone, r: number, c: number): Move {
    let move: Move = []
    this.forEachNeighbor(r, c, (dR, dC, s) => {
      this.getFlipsInDirection(a, r, c, dR, dC).forEach(([r, c]) => {
        const s = otherStone(this.squares[r][c] as Stone)
        this.squares[r][c] = s
        move.push({ r, c, s })
      })
    })
    if (move.length > 0) {
      this.squares[r][c] = a
      return [{ r, c, s: a }, ...move]
    } else {
      throw Error(`invalid move: ${a}, r ${r}, c ${c}`)
    }
  }

  getFlipsInDirection(
    placing: Stone,
    r: number,
    c: number,
    dR: Direction,
    dC: Direction,
  ): Location[] {
    const flipping: Stone = otherStone(placing),
      flips: Location[] = []
    let flipped

    r += dR
    c += dC
    while (true) {
      flipped = this.lookup(r, c)
      if (flipped !== flipping) {
        break
      }
      flips.push([r, c])
      r += dR
      c += dC
    }
    if (flipped === placing) {
      return flips
    }
    return []
  }

  isValidMove(a: Stone, r: number, c: number) {
    if (this.squares[r][c] !== "empty") {
      return false
    }

    let found = false
    this.forEachNeighbor(r, c, (dR, dC) => {
      if (this.getFlipsInDirection(a, r, c, dR, dC).length > 0) {
        found = true
      }
    })
    return found
  }

  lookup(r: number, c: number): SquareState | undefined {
    if (r >= 0 && r < this.size && c >= 0 && c < this.size) {
      return this.squares[r][c]
    }
  }

  forEachNeighbor(r: number, c: number, f: NeighborVisitor) {
    let x, y, n
    for (x = -1; x < 2; x++) {
      for (y = -1; y < 2; y++) {
        if (x === 0 && y === 0) {
          continue
        }
        n = this.lookup(r + y, c + x)
        if (n) {
          f(y as Direction, x as Direction, n)
        }
      }
    }
  }

  forEachSquare(f: BoardVisitor) {
    this.squares.forEach((row, iRow) =>
      row.forEach((s, iCol) => f(iRow, iCol, s)),
    )
  }

  /**
   *    0 1 2 3 4 5 6 7
   *  0 - - - - - - - -
   *  1 - - - - - - - -
   *  2 - - - - - - - -
   *  3 - - - B W - - -
   *  4 - - - W B - - -
   *  5 - - - - - - - -
   *  6 - - - - - - - -
   *  7 - - - - - - - -
   */
  toString(): string {
    return [
      `  ${Array(this.size)
        .fill(undefined)
        .map((_, i) => i)
        .join(" ")}`,
      ...this.squares.map(
        (row, i) =>
          `${i} ${row
            .map(s => {
              switch (s) {
                case "black":
                  return "B"
                case "white":
                  return "W"
                case "empty":
                  return "-"
              }
            })
            .join(" ")}`,
      ),
    ].join("\n")
  }

  private empty() {
    return Array(this.size)
      .fill(undefined)
      .map(() => Array(this.size).fill("empty"))
  }
}

export type ReversiState =
  | "empty"
  | "in-progress"
  | "winner-black"
  | "winner-white"
  | "tie"

export class Reversi {
  board: Board = new Board()
  currentStone: Stone = "black"
  validMoves: Location[] = []
  blackScore: number = 0
  whiteScore: number = 0
  lastMove?: Move

  toJSON(): GameState {
    return {
      blackScore: this.blackScore,
      whiteScore: this.whiteScore,
      board: this.board.squares.map(r => [...r]),
      currentStone: this.currentStone,
      validMoves: this.validMoves.map(l => [...l]),
      lastMove: this.lastMove?.map(m => ({ ...m })),
      state: this.state,
    }
  }

  public get state(): ReversiState {
    const totalScore = this.blackScore + this.whiteScore,
      totalSquares = this.board.size * this.board.size
    if (totalScore === 0) {
      return "empty"
    } else if (totalScore < totalSquares) {
      return "in-progress"
    } else if (this.blackScore < this.whiteScore) {
      return "winner-white"
    } else if (this.blackScore > this.whiteScore) {
      return "winner-black"
    } else {
      return "tie"
    }
  }

  newGame(firstStone: Stone) {
    this.board.reset()
    const s = this.board.squares

    s[3][3] = "black"
    s[3][4] = "white"
    s[4][3] = "white"
    s[4][4] = "black"

    this.lastMove = undefined
    this.currentStone = firstStone
    this.updateScore()
    this.updateValidMoves()
  }

  pass() {
    this.lastMove = []
    this.currentStone = otherStone(this.currentStone)
    this.updateValidMoves()
  }

  move(r: number, c: number) {
    this.lastMove = this.board.move(this.currentStone, r, c)
    this.currentStone = otherStone(this.currentStone)
    this.updateScore()
    this.updateValidMoves()
  }

  isValidMove(r: number, c: number) {
    return this.board.isValidMove(this.currentStone, r, c)
  }

  updateScore() {
    this.blackScore = 0
    this.whiteScore = 0
    this.board.forEachSquare((r, c, s) => {
      switch (s) {
        case "black":
          this.blackScore++
          break
        case "white":
          this.whiteScore++
          break
      }
    })
  }

  updateValidMoves() {
    this.validMoves = []
    this.board.forEachSquare((r, c, s) => {
      if (this.board.isValidMove(this.currentStone, r, c)) {
        this.validMoves.push([r, c])
      }
    })
  }

  toString(): string {
    return `
    blackScore: ${this.blackScore}
    whiteScore: ${this.whiteScore}
    currentStone: ${this.currentStone}
    validMoves: ${JSON.stringify(this.validMoves)}
    board:\n${this.board.toString()}
    `
  }
}

export function initialGameState(): GameState {
  const game = new Reversi()
  game.newGame("black")
  return game.toJSON()
}
