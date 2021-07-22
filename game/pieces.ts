export type PieceType = "King" | "Queen" | "Rook" | "Bishop" | "Knight" | "Pawn";

export type TeamType = "teamBlack" | "teamWhite";
export type Location = [number, number];
export type PieceOptions = {
  type: PieceType;
  count: number;
  value: number;
  allowedMvmts: Location[];
};

export interface PieceInterface {
  team: TeamType;
  type: PieceType;
  currentSquare: Location;
  reachableSquares: Location[];
  count: number;
  value: number;
  updatePossibleMoves: () => this;
  allowedMvmts: Location[];
  moveTo: (location: Location) => this;
}

export class Piece implements PieceInterface {
  reachableSquares: Location[] = [];
  allowedMvmts: Location[] = [];
  count: number = 0;
  value: number = 0;

  constructor(public team: TeamType, public type: PieceType, public currentSquare: Location) {
    const pieceOptions = getPieceOptions(this.type);
    this.allowedMvmts = pieceOptions.allowedMvmts;
    this.count = pieceOptions.count;
    this.value = pieceOptions.value;
    this.updatePossibleMoves();
  }

  moveTo(location: Location): this {
    this.currentSquare = location;
    return this;
  }

  // calculates next moves from current square after move, based only on rules for piece, not current board state
  updatePossibleMoves(): this {
    this.allowedMvmts.forEach((mvmt: Location) => {
      this.reachableSquares.push([
        mvmt[0] + this.currentSquare[0],
        mvmt[1] + this.currentSquare[1],
      ]);
    });
    return this;
  }
}

function getPieceOptions(type: PieceType): PieceOptions {
  switch (type) {
    case "Pawn":
      return {
        type: "Pawn",
        count: 8,
        value: 1,
        allowedMvmts: [
          [0, -1], // not capturing
          [-1, -1], // if capturing
          [1, -1], // if capturing
          [0, -2], // if is first move & not capturing
        ],
      };
    case "Rook":
      return {
        type: "Rook",
        count: 2,
        value: 5,
        allowedMvmts: [
          [1, 0],
          [-1, 0],
          [0, -1],
          [0, 1],
        ],
      };
    case "Knight":
      return {
        type: "Knight",
        count: 2,
        value: 3,
        allowedMvmts: [
          [2, -1],
          [2, 1],
          [-2, -1],
          [-2, 1],
          [1, 2],
          [-1, 2],
          [-1, -2],
          [1, -2],
        ],
      };
    case "Bishop":
      return {
        type: "Bishop",
        count: 2,
        value: 5,
        allowedMvmts: [
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1],
        ],
      };
    case "Queen":
      return {
        type: "Queen",
        count: 1,
        value: 9,
        allowedMvmts: [
          [1, 0],
          [-1, 0],
          [0, -1],
          [0, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1],
        ],
      };
    case "King":
      return {
        type: "King",
        count: 1,
        value: 9,
        allowedMvmts: [
          [1, 0],
          [-1, 0],
          [0, -1],
          [0, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1],
        ],
      };
  }
}

/*
export class Pawn implements Piece {
  // first move can be 2 spaces
  // can move diagonally if capturing
  // only moves forward
  // can swap for other piece (except for king) when reaches other side of board
  // can be captured en passent
  reachableSquares: any[] = [];
  constructor(public team: TeamType, public currentSquare: Location) {}
  options: PieceOptions = pawnOptions;

  moveTo(location: Location): this {
    this.currentSquare = location;
    return this;
  }

  // calculates next moves from current square after move, based only on rules for piece, not current board state
  updatePossibleMoves(): this {
    const allowedMvmt: Location[] = [
      [0, -1],
      [-1, -1], // if capturing
      [1, -1], // if capturing
      [0, -2], // if is first move
    ] as Location[];

    allowedMvmt.forEach((mvmt: Location) => {
      this.reachableSquares.push([
        mvmt[0] + this.currentSquare[0],
        mvmt[1] + this.currentSquare[1],
      ]);
    });

    return this;
  }
}

export class Knight implements Piece {
  // can jump over other pieces
  type: PieceType = "Knight";
  count: number = 2;
  value: number = 3;
  reachableSquares: any[] = [];
  constructor(public team: TeamType, public currentSquare: Location) {}
  options: PieceOptions;

  updatePossibleMoves(): this {
    const allowedMvmt: Location[] = [
      [2, -1],
      [2, 1],
      [-2, -1],
      [-2, 1],
      [1, 2],
      [-1, 2],
      [-1, -2],
      [1, -2],
    ] as Location[];

    allowedMvmt.forEach((mvmt: Location) => {
      this.reachableSquares.push([
        mvmt[0] + this.currentSquare[0],
        mvmt[1] + this.currentSquare[1],
      ]);
    });

    return this;
  }
}

export class Bishop implements Piece {
  type: PieceType = "Bishop";
  count: number = 2;
  value: number = 3;
  reachableSquares: any[] = [];
  constructor(public team: TeamType, public currentSquare: Location) {}
  options: PieceOptions;

  updatePossibleMoves(): this {
    const allowedMvmt: Location[] = [
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ] as Location[];

    allowedMvmt.forEach((mvmt: Location) => {
      let [i, j]: Location = this.currentSquare;
      while (i < 8 && j < 8) {
        this.reachableSquares.push([
          mvmt[0] * i + this.currentSquare[0],
          mvmt[1] * j + this.currentSquare[1],
        ]);
        i++, j++;
      }
    });

    return this;
  }
}

export class Rook implements Piece {
  type: PieceType = "Rook";
  count: number = 2;
  value: number = 5;
  reachableSquares: any[] = [];
  constructor(public team: TeamType, public currentSquare: Location) {}
  options: PieceOptions;
  updatePossibleMoves(): this {
    const allowedMvmt: Location[] = [
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
    ] as Location[];

    allowedMvmt.forEach((mvmt: Location) => {
      let [i, j]: Location = this.currentSquare;
      while (i < 8 && j < 8) {
        this.reachableSquares.push([
          mvmt[0] * i + this.currentSquare[0],
          mvmt[1] * j + this.currentSquare[1],
        ]);
        i++, j++;
      }
    });

    return this;
  }
}

export class Queen implements Piece {
  type: PieceType = "Queen";
  count: number = 1;
  value: number = 9;
  reachableSquares: any[] = [];
  constructor(public team: TeamType, public currentSquare: Location) {}
  options: PieceOptions;

  updatePossibleMoves(): this {
    const allowedMvmt: Location[] = [
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ] as Location[];

    allowedMvmt.forEach((mvmt: Location) => {
      let [i, j]: Location = this.currentSquare;
      while (i < 8 && j < 8) {
        this.reachableSquares.push([
          mvmt[0] * i + this.currentSquare[0],
          mvmt[1] * j + this.currentSquare[1],
        ]);
        i++, j++;
      }
    });

    return this;
  }
}

export class King implements Piece {
  //can't move into check
  type: PieceType = "King";
  count: number = 1;
  value: number = 0;
  reachableSquares: any[] = [];
  constructor(public team: TeamType, public currentSquare: Location) {}
  options: PieceOptions;

  updatePossibleMoves(): this {
    const allowedMvmt: Location[] = [
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ] as Location[];

    allowedMvmt.forEach((mvmt: Location) => {
      let [i, j]: Location = this.currentSquare;
      this.reachableSquares.push([
        mvmt[0] + this.currentSquare[0],
        mvmt[1] + this.currentSquare[1],
      ]);
    });

    return this;
  }
}
*/
