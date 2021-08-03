export type Coord = [number, number];
export type Player = 1 | 2;

export type GameState = {
  turn: Player;
  player1Score: number;
  player2Score: number;
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

export class Gridlines {
  board: Board;
  gameState: GameState = {
    turn: 1,
    player1Score: 0,
    player2Score: 0,
  };

  constructor(size: number) {
    this.board = new Board(size);
  }
}

export class Board {
  size: number;
  grid: (Square | Edge | Corner)[][];

  constructor(size: number) {
    this.size = size;
    this.grid = this.initGrid(this.size);
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
              }
              console.log("sidesSelected", square.sidesSelected);
            },
          };

          row.push(square);
        }
      }
      gridSquares.push(row);
    }
    return gridSquares;
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
