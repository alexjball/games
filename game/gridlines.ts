import {
  Block,
  Coord,
  Corner,
  Edge,
  GameState,
  GridLineState,
  Player,
  Square,
} from "../Types/gridlinesTypes";

export class Gridlines {
  size: number;
  turn: Player;
  player1Score: number;
  player2Score: number;
  board: Block[][];
  gridLineState: GridLineState;

  constructor(size: number) {
    this.size = size;
    this.turn = 1;
    this.player1Score = 0;
    this.player2Score = 0;
    this.board = this.initGrid(this.size);
    this.gridLineState = "empty";
  }

  toJSON(): GameState {
    return {
      turn: this.turn,
      player1Score: this.player1Score,
      player2Score: this.player2Score,
      board: this.board.map((r) => [...r]),
      gridLineState: this.gridLineState,
    };
  }

  isEven(num: number) {
    return num % 2 === 0;
  }

  initGrid(size: number) {
    const gridSquares: (Square | Edge | Corner)[][] = [];
    for (let r = 0; r <= size; r++) {
      const row = [];
      for (let c = 0; c <= size; c++) {
        if (this.isEven(r) && this.isEven(c)) {
          const corner: Corner = {
            blockType: "corner",
            coord: [c, r],
          };
          row.push(corner);
        } else if (this.isEven(r) || this.isEven(c)) {
          const edge: Edge = {
            blockType: "edge",
            coord: [c, r],
            isSelected: false,
            neighbors: setNeighbors([c, r]),
          };
          row.push(edge);
        } else {
          const square: Square = {
            blockType: "square",
            coord: [c, r],
            isCaptured: false,
            capturedBy: null,
            sidesSelected: 0,
            // sideClick: () => this.handleSideClick(square),
          };
          row.push(square);
        }
      }
      gridSquares.push(row);
    }
    return gridSquares;
  }

  gameProgress(): GridLineState {
    const totalScore = this.player1Score + this.player2Score,
      totalSquares = this.size * this.size;
    if (totalScore === 0) {
      return "empty";
    } else if (totalScore < totalSquares) {
      return "in-progress";
    } else if (this.player1Score > this.player2Score) {
      return "winner-player1";
    } else if (this.player2Score > this.player1Score) {
      return "winner-player2";
    } else {
      return "tie";
    }
  }

  handleSideClick(square: Square) {
    square.sidesSelected += 1;
    if (square.sidesSelected >= 4) {
      this.captureSquare(square);
    }
    return square;
  }

  isSquare(block?: Block): block is Square {
    return block?.blockType === "square";
  }
  isEdge(block?: Block): block is Edge {
    return block?.blockType === "edge";
  }

  getSquare(coord: Coord): Square {
    const [c, r] = coord;
    const sq = this.board[r][c] as Square;
    if (!this.isSquare(sq)) {
      throw Error("coord is not a square");
    }
    return sq;
  }

  getEdge(coord: Coord): Edge{
    const [c, r] = coord;
    const edge = this.board[r][c] as Edge;
    if(!this.isEdge(edge)) {
      throw Error("coord is not an edge")
    }
    return edge; 
  }

  captureSquare(square: Square) {
    const isCaptured = true;
    const capturedBy = this.turn;
    return { ...square, isCaptured, capturedBy };
  }

  move(edge: Edge) {
    edge.isSelected = true;
    let hasCaptured = false;
    for (let [c, r] of edge.neighbors) {
      console.log("neighbors", edge.neighbors);
      let nBlk = this.board[r][c];
      if (nBlk.blockType === "square") {
        nBlk = this.handleSideClick(nBlk);
        if (nBlk.isCaptured) {
          hasCaptured = true;
          this.updateScore(this.turn);
        }
      }
    }
    if (!hasCaptured) {
      this.turn = this.updateTurn();
    }
  }

  updateTurn(): Player {
    const newTurn = this.turn === 1 ? 2 : 1;
    return newTurn;
  }

  updateScore(player: Player) {
    player === 1 && this.player1Score++;
    player === 2 && this.player2Score++;
  }

  checkScore(num: number) {
    return num === 1 ? this.player1Score : this.player2Score
  }
}

const setNeighbors = (coord: Coord) => {
  const [c, r]: Coord = coord;
  const neighbors: Coord[] = [
    [c + 1, r],
    [c, r + 1],
  ];
  r > 0 && neighbors.push([c, r - 1]);
  c > 0 && neighbors.push([c - 1, r]);
  return neighbors;
};
