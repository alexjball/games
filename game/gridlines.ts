import {
  Block,
  Coord,
  Corner,
  Direction,
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
  hoveredEdge?: Coord;

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
      hoveredEdge: this.hoveredEdge,
    };
  }

  isEven(num: number) {
    return num % 2 === 0;
  }

  isOdd(num: number) {
    return num % 2 === 1;
  }

  initGrid(size: number) {
    const gridSquares: (Square | Edge | Corner)[][] = [];
    for (let r = 0; r <= size; r++) {
      const row = [];
      for (let c = 0; c <= size; c++) {
        if (this.isOdd(r) && this.isOdd(c)) {
          row.push(this.createSquare([c, r]));
        } else if (this.isOdd(c + r)) {
          row.push(this.createEdge([c, r]));
        } else {
          row.push(this.createCorner([c, r]));
        }
      }
      gridSquares.push(row);
    }

    return gridSquares;
  }

  createEdge(coord: Coord): Edge {
    return {
      blockType: "edge",
      coord: coord,
      isSelected: false,
      neighbors: [],
    };
  }

  createSquare(coord: Coord): Square {
    return {
      blockType: "square",
      coord: coord,
      isCaptured: false,
      capturedBy: null,
      sidesSelected: 0,
    };
  }

  createCorner(coord: Coord): Corner {
    return {
      blockType: "corner",
      coord: coord,
    };
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

  isSquare(block?: Block): block is Square {
    return block?.blockType === "square";
  }

  isEdge(block?: Block): block is Edge {
    return block?.blockType === "edge";
  }

  getBlock(coord: Coord): Block {
    const [c, r] = coord;
    return this.board[r][c];
  }

  getSquare(coord: Coord): Square {
    const [c, r] = coord;
    const sq = this.board[r][c] as Square;
    if (!this.isSquare(sq)) {
      throw Error(`${coord} is not a square`);
    }
    return sq;
  }

  getEdge(coord: Coord): Edge {
    const [c, r] = coord;
    const edge = this.board[r][c] as Edge;
    if (!this.isEdge(edge)) {
      throw Error(`${coord} is not an edge`);
    }
    return edge;
  }

  getHoveredEdge(coord: Coord, direction: Direction[]): Coord {
    const [c, r] = coord;
    const [x, y] = direction;

    return [c + x, r + y];
  }

  handleSideClick(square: Square): Square {
    square.sidesSelected += 1;
    console.log(square.coord, square.sidesSelected);
    if (square.sidesSelected >= 4) {
      square = { ...square, isCaptured: true, capturedBy: this.turn };
    }
    return square;
  }

  move(hoveredEdgeCoord: Coord) {
    const hoveredEdge: Edge = this.getBlock(hoveredEdgeCoord) as Edge;
    if (hoveredEdge.isSelected) {
      console.log(`is selected ${hoveredEdge.coord}`);
      return;
    }

    hoveredEdge.isSelected = true;
    let hasCaptured = false;

    const neighbors = this.getNeighborCoords(hoveredEdge.coord) as Coord[];
    for (let coord of neighbors) {
      const [x, y] = coord;
      if (x >= this.size || y >= this.size) break;
      let nBlk = this.getBlock(coord) as Square;
      if (this.isSquare(nBlk)) {
        nBlk.sidesSelected += 1;
        console.log(nBlk.coord, nBlk.sidesSelected);
        if (nBlk.sidesSelected >= 4) {
          nBlk.isCaptured = true;
          nBlk.capturedBy = this.turn;
        }
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
    return num === 1 ? this.player1Score : this.player2Score;
  }

  getNeighborCoords(coord: Coord) {
    const [c, r]: Coord = coord;

    return [
      [c + 1, r],
      [c, r + 1],
      [c, r - 1],
      [c - 1, r],
    ];
  }
}
