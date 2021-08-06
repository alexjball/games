export type Coord = [number, number];
export type Player = 1 | 2;

export type GameState = {
  turn: Player | null;
  player1Score: number;
  player2Score: number;
  board: (Square | Edge | Corner)[][];
};

export type Corner = {
  blockType: "corner";
  coord: Coord;
};

export type Edge = {
  blockType: "edge";
  isSelected: boolean;
  coord: Coord;
  neighbors: Coord[];
};

export type Square = {
  blockType: "square";
  coord: Coord;
  isCaptured: boolean;
  capturedBy: Player | null;
  sidesSelected: number;
  sideClick(): void;
};

export type Block = Square | Edge | Corner;

export type GridLineState = "empty" | "in-progress" | "winner-player1" | "winner-player2" | "tie";

export class Gridlines {
  size: number;
  gameState: GameState;
  grid: (Square | Edge | Corner)[][];

  constructor(size: number) {
    this.size = size;
    this.grid = this.initGrid(this.size);

    this.gameState = {
      turn: 1,
      player1Score: 0,
      player2Score: 0,
      board: this.grid.map((r) => [...r]),
    };
  }

  initGrid(size: number) {
    const gridSquares: (Square | Edge | Corner)[][] = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let k = 0; k < size; k++) {
        if (i % 2 === 0 || k % 2 === 0) {
          if (i % 2 === 0 && k % 2 === 0) {
            const corner: Corner = {
              blockType: "corner",
              coord: [k, i],
            };
            row.push(corner);
          } else {
            const edge: Edge = {
              blockType: "edge",
              coord: [k, i],
              isSelected: false,
              neighbors: setNeighbors([k, i]),
            };
            row.push(edge);
          }
        } else {
          const square: Square = {
            blockType: "square",
            coord: [k, i],
            isCaptured: false,
            capturedBy: null,
            sidesSelected: 0,
            sideClick: () => {
              square.sidesSelected += 1;
              if (square.sidesSelected >= 4) {
                square.isCaptured = true;
                square.capturedBy = this.gameState.turn;
              }
            },
          };

          row.push(square);
        }
      }
      gridSquares.push(row);
    }
    return gridSquares;
  }

  get state(): GridLineState {
    const totalScore = this.gameState.player1Score + this.gameState.player2Score,
      totalSquares = this.size * this.size;
    if (totalScore === 0) {
      return "empty";
    } else if (totalScore < totalSquares) {
      return "in-progress";
    } else if (this.gameState.player1Score > this.gameState.player2Score) {
      return "winner-player1";
    } else if (this.gameState.player2Score > this.gameState.player1Score) {
      return "winner-player2";
    } else {
      return "tie";
    }
  }

}

const setNeighbors = (coord: Coord) => {
  const [k, i]: Coord = coord;
  const neighbors: Coord[] = [
    [k + 1, i],
    [k, i + 1],
  ];
  i > 0 && neighbors.push([k, i - 1]);
  k > 0 && neighbors.push([k - 1, i]);
  return neighbors;
};
