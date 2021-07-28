export type PieceType = "King" | "Queen" | "Rook" | "Bishop" | "Knight" | "Pawn";

export type TeamType = "teamBlack" | "teamWhite";
export type Location = [number, number];

export type MovementType = "direction" | "displacement";

export type PieceOptions = {
  type: PieceType;
  count: number;
  value: number;
  allowedMvmts: Location[];
  movementType: MovementType;
};

export interface PieceInterface {
  team: TeamType;
  type: PieceType;
  currentSquare: Location;
  reachableSquares: Location[];
  count: number;
  value: number;
  updateReachableSquares: () => this;
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
    this.updateReachableSquares();
  }

  moveTo(location: Location): this {
    this.currentSquare = location;
    return this;
  }

  // calculates next moves from current square after move, based only on rules for piece, not current board state
  updateReachableSquares(): this {
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
        movementType: "displacement",
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
        movementType: "direction",
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
        movementType: "displacement",
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
        movementType: "direction",
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
        movementType: "direction",
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
        movementType: "displacement",
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
