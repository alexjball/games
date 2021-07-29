// export type Piece = "Piece"
export type SquareState = null | Piece;
export type Row = SquareState[];
export type BoardVisitor = (r: number, c: number, s: SquareState) => void;
export type Move = { r: number; c: number; p: Piece }[];
export type Coord = [number, number];
export type Color = "black" | "white";

export class Board {
  readonly size = 8;
  squares: Row[];

  constructor() {
    this.squares = this.empty();
  }

  reset() {
    this.squares = this.empty();
  }

  move(): Move {
    let move: Move = [];
    return move;
  }

  lookup(r: number, c: number): SquareState | undefined {
    if (r >= 0 && r < this.size && c >= 0 && c < this.size) {
      return this.squares[r][c];
    }
  }

  place(r: number, c: number, piece: Piece) {
    this.squares[r][c] = piece;
  }

  forEachSquare(f: BoardVisitor) {
    this.squares.forEach((row, iRow) => row.forEach((s, iCol) => f(iRow, iCol, s)));
  }

  printBoard() {
    console.log(this.squares);
  }

  private empty() {
    return Array(this.size)
      .fill(undefined)
      .map(() => Array(this.size).fill(null));
  }
}

export class Piece {
  location: Coord = [0, 0];
  color: Color;

  constructor(color: Color, r: number, c: number) {
    this.location = [r, c];
    this.color = color;
  }
  findValidMoves() {
    return this.availableMoves.map((move) => addDisplacement(move, this.location));
  }
  availableMoves = [[0, 1] as Coord, [0, 2] as Coord];
}

function addDisplacement(coord1: Coord, coord2: Coord) {
  return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
}
