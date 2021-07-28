import { Piece } from "./pieces";

export type SquareState = "empty" | Piece;
export type Row = SquareState[];
export type Location = [number, number];
export interface GameState {
  state: ChessState;
  board: Row[];
  remainingPieces: Piece[];
  validMoves?: Location[];
  lastMove?: Move;
  blackScore: number;
  whiteScore: number;
}

export type Direction = -1 | 0 | 1;
export type NeighborVisitor = (dR: Direction, dC: Direction, s: SquareState) => void;
export type BoardVisitor = (r: number, c: number, s: SquareState) => void;
export type Move = { r: number; c: number; p: Piece }[];

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

  forEachSquare(f: BoardVisitor) {
    this.squares.forEach((row, iRow) => row.forEach((s, iCol) => f(iRow, iCol, s)));
  }

  printBoard() {
    console.log(this.squares);
  }

  private empty() {
    return Array(this.size)
      .fill(undefined)
      .map(() => Array(this.size).fill("empty"));
  }
}

export type ChessState =
  | "empty"
  | "in-progress"
  | "check-black"
  | "check-white"
  | "winner-black"
  | "winner-white"
  | "tie";

export class Chess {
  board: Board = new Board();
  remainingPieces: Piece[] = [];
  validMoves?: Location[] = undefined;
  blackScore: number = 0;
  whiteScore: number = 0;
  lastMove?: Move;

  toJSON(): GameState {
    return {
      blackScore: this.blackScore,
      whiteScore: this.whiteScore,
      board: this.board.squares.map((r) => [...r]),
      remainingPieces: this.remainingPieces,
      validMoves: this.validMoves?.map((l) => [...l]) as Location[],
      lastMove: this.lastMove?.map((m) => ({ ...m })),
      state: this.state,
    };
  }

  public get state(): ChessState {
    const totalScore = this.blackScore + this.whiteScore,
      totalSquares = this.board.size * this.board.size;
    if (totalScore === 0) {
      return "empty";
    } else if (totalScore < totalSquares) {
      return "in-progress";
    } else if (this.blackScore < this.whiteScore) {
      return "winner-white";
    } else if (this.blackScore > this.whiteScore) {
      return "winner-black";
    } else if (this.blackScore > 100) {
      return "check-black";
    } else if (this.whiteScore > 100) {
      return "check-white";
    } else {
      return "tie";
    }
  }

  newGame() {
    this.board.reset();
    const s = this.board.squares;

    s[0][0] = new Piece("teamBlack", "Rook", [0, 0]);
    s[1][0] = new Piece("teamBlack", "Knight", [1, 0]);
    s[2][0] = new Piece("teamBlack", "Bishop", [2, 0]);
    s[3][0] = new Piece("teamBlack", "Queen", [3, 0]);
    s[4][0] = new Piece("teamBlack", "King", [4, 0]);
    s[5][0] = new Piece("teamBlack", "Bishop", [5, 0]);
    s[6][0] = new Piece("teamBlack", "Knight", [6, 0]);
    s[7][0] = new Piece("teamBlack", "Rook", [7, 0]);

    s[0][1] = new Piece("teamBlack", "Pawn", [0, 1]);
    s[1][1] = new Piece("teamBlack", "Pawn", [1, 1]);
    s[2][1] = new Piece("teamBlack", "Pawn", [2, 1]);
    s[3][1] = new Piece("teamBlack", "Pawn", [3, 1]);
    s[4][1] = new Piece("teamBlack", "Pawn", [4, 1]);
    s[5][1] = new Piece("teamBlack", "Pawn", [5, 1]);
    s[6][1] = new Piece("teamBlack", "Pawn", [6, 1]);
    s[7][1] = new Piece("teamBlack", "Pawn", [7, 1]);

    s[0][8] = new Piece("teamWhite", "Rook", [0, 8]);
    s[1][8] = new Piece("teamWhite", "Knight", [1, 8]);
    s[2][8] = new Piece("teamWhite", "Bishop", [2, 8]);
    s[3][8] = new Piece("teamWhite", "Queen", [3, 8]);
    s[4][8] = new Piece("teamWhite", "King", [4, 8]);
    s[5][8] = new Piece("teamWhite", "Bishop", [5, 8]);
    s[6][8] = new Piece("teamWhite", "Knight", [6, 8]);
    s[7][8] = new Piece("teamWhite", "Rook", [7, 8]);

    s[0][7] = new Piece("teamWhite", "Pawn", [0, 7]);
    s[1][7] = new Piece("teamWhite", "Pawn", [1, 7]);
    s[2][7] = new Piece("teamWhite", "Pawn", [2, 7]);
    s[3][7] = new Piece("teamWhite", "Pawn", [3, 7]);
    s[4][7] = new Piece("teamWhite", "Pawn", [4, 7]);
    s[5][7] = new Piece("teamWhite", "Pawn", [5, 7]);
    s[6][7] = new Piece("teamWhite", "Pawn", [6, 7]);
    s[7][7] = new Piece("teamWhite", "Pawn", [7, 7]);

    this.lastMove = undefined;
    this.updateScore();
  }

  move(p: Piece, r: number, c: number) {
    // this.lastMove = this.board.move(p, r, c);
    this.updateScore();
    p.updateReachableSquares();
  }

  capture(p: Piece, cap: Piece, r: number, c: number) {}

  updateRemainingPieces() {}

  updateScore() {
    this.blackScore = 0;
    this.whiteScore = 0;
    // if a piece was captured or exchanged, update the point sum of captured pieces

    // this.board.forEachSquare((r, c, s) => {
    //   switch (s) {
    //     case "black":
    //       this.blackScore++;
    //       break;
    //     case "white":
    //       this.whiteScore++;
    //       break;
    //   }
    // });
  }
}

export function initialGameState(): GameState {
  const game = new Chess();
  game.newGame();
  return game.toJSON();
}
