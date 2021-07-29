import { Board, SquareState, Piece } from "./chess2";

describe("board", () => {
  it("initially empty board", () => {
    const board: Board = new Board();

    const isEmpty = (iRow: number, iCol: number, s: SquareState) => expect(s).toBe(null);
    board.forEachSquare(isEmpty);
  });

  it("puts one piece on the board", () => {
    const board: Board = new Board();
    const piece: Piece = new Piece("black", 3, 2);
    board.place(3, 2, piece)
    expect(board.squares[3][2]).toBe(piece)
  });

});

describe("piece", () => {
  it("exists", () => {
    const piece = new Piece("black", 3, 2);
    expect(piece).toBeDefined();
  });
  it("finds valid moves", () => {
    const piece = new Piece("black", 3, 2);
    const validMoves = piece.findValidMoves()
    expect(validMoves).toEqual([[3, 3], [3, 4]])
  });
  it("has a color", () => {
    const piece = new Piece("black", 3, 2)
    expect(piece.color).toBe("black")
  })
  it("picks direction based on color", () => {
    
    const blackPiece = new Piece("black", 3, 2)
    const whitePiece = new Piece("white", 3, 6)

    

  })
});
