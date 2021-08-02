export type Coord = [number, number];
export type Player = 1 | 2;
export type SquareState = {
  coord: Coord;
  clickedSides: number[];
  isCaptured: boolean;
  capturedBy: Player | null;
};
export type SquareType = {
  coord: Coord;
  clickedSides: number[];
  isCaptured: boolean;
  capturedBy: Player | null;
  clicks: number;
  clicked: (side: string) => void;
};
export type GameState = {
  turn: Player;
  player1Score: number;
  player2Score: number;
};

export class Gridlines {
  board: Board;
  turn: Player = 1;
  player1Score: number = 0;
  player2Score: number = 0;

  constructor(size: number) {
    this.board = new Board(size);
  }
}

export class Board {
  size: number;
  grid: Square[][];

  constructor(size: number) {
    this.size = size;
    this.grid = this.initGrid(this.size);
  }

  initGrid(size: number) {
    const gridSquares: Square[][] = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let k = 0; k < size; k++) {
        const square = new Square(i, k);
        row.push(square);
      }
      gridSquares.push(row);
    }
    return gridSquares;
  }
}

export class Square implements SquareType {
  coord: Coord;
  clickedSides: number[];
  isCaptured: boolean;
  capturedBy: Player | null;
  clicks: number = 0;

  constructor(i: number, k: number) {
    this.coord = [i, k];
    this.clickedSides = [0, 0, 0, 0];
    this.isCaptured = false;
    this.capturedBy = null;
  }

  countClicks() {
    return this.clickedSides.reduce((a, b) => a + Number(b), 0);
  }

  clicked = (side: string) => {
    switch(side){
      case "borderTop":
        this.clickedSides[0] = 1
        break
      case "borderRight":
        this.clickedSides[1] = 1
        break
      case "borderBottom":
        this.clickedSides[2] = 1
        break
      case "borderLeft":
        this.clickedSides[3] = 1
        break
    }
    if (this.clickedSides.every(side => side === 1)) {
      this.isCaptured = true;
    }
    console.log("clicked", this.clickedSides, this.isCaptured);
  };
}
