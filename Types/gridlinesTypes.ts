export type Coord = [number, number];
export type Player = 1 | 2;

export type GameState = {
  turn: Player | null;
  player1Score: number;
  player2Score: number;
  board: (Square | Edge | Corner)[][];
  gridLineState: GridLineState;
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
};

export type Block = Square | Edge | Corner;

export type GridLineState = "empty" | "in-progress" | "winner-player1" | "winner-player2" | "tie";

export type SquarePropsType = {
  coord: Coord;
  isCaptured: boolean;
  capturedBy: Player | null;
  sidesSelected: number;
  index: number;
  onclick: () => void;
  reportMousePosition: (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => void;
};

export type EdgePropsType = {
  isSelected: boolean;
  coord: Coord;
  hovered: boolean;
  onclick: () => void;
  reportMousePosition: (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => void;
};


export type BoardPropsType = {
  gameState: GameState;
  clicked: () => void;
  reportMousePosition: (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => void;
  hoveredEdge: Coord;
};