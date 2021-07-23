import { TicTacToe } from "./tictactoe"

describe("TicTacToe", () => {
  it("Can be constructed", () => {
    const t = new TicTacToe()
  })

  it("Can start a game", () => {
    const t = new TicTacToe()
    expect(t.status).toEqual("in-progress")
    t.newGame("X")
    expect(t.currentMarker).toBe("X")
    t.forEachSquare(s => expect(s).toBeNull())
  })

  it("has expected properties", () => {
    const t = new TicTacToe(),
      expectedKeys = ["size", "currentMarker", "board", "validMoves", "status"]
    const keys = Object.keys(t)
    expect(keys).toEqual(expectedKeys)
  })

  it("Can move", () => {
    const t = new TicTacToe()
    t.newGame("X")
    t.move(1, 1)
    expect(t.board).toEqual([
      [null, null, null],
      [null, "X", null],
      [null, null, null],
    ])
  })

  it("Resets", () => {
    const t = new TicTacToe()

    t.newGame("X")
    t.move(1, 1)

    t.newGame("O")
    expect(t.currentMarker).toEqual("O")
    t.forEachSquare(s => expect(s).toBeNull())
  })

  it("Shows available moves", () => {
    const t = new TicTacToe()

    t.newGame("X")

    expect(t.validMoves).toHaveLength(9)
    t.move(1, 1)
    expect(t.validMoves).toHaveLength(8)
  })

  it("X wins", () => {
    const t = new TicTacToe()

    t.newGame("X")
    t.move(1, 1)
    t.move(0, 0)
    t.move(0, 1)
    t.move(1, 0)
    t.move(2, 1)

    expect(t.status).toEqual("win-X")
  })

  it("O wins", () => {
    const t = new TicTacToe()

    t.newGame("X")
    t.move(1, 1)
    t.move(0, 0)
    t.move(0, 1)
    t.move(1, 0)
    t.move(2, 2)
    t.move(2, 0)

    expect(t.status).toEqual("win-O")
  })

  it("tie", () => {
    const t = new TicTacToe()

    t.newGame("X")
    t.move(1, 1)
    t.move(0, 0)
    t.move(0, 1)
    t.move(1, 0)
    t.move(2, 0)
    t.move(2, 1)
    t.move(1, 2)
    t.move(0, 2)
    t.move(2, 2)

    expect(t.status).toEqual("tie")
  })
})
