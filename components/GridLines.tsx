import React, { useState } from "react";
import { Coord } from "../game/chess2";
import { Block, Corner, Edge, GameState, Gridlines, Square } from "../game/gridlines";
import "../styles/globals.css";
import "../styles/gridlines.css";
import { BoardView } from "./BoardView";

export default function GridlinesView(props: { size: number }) {
  const [gridlines] = useState(() => new Gridlines(props.size));
  const [game, setGame] = useState<GameState>(() => gridlines.toJSON());
  const rerender = () => setGame(gridlines.toJSON());
  
  const [hoveredEdge, setHoveredEdge] = useState<[number, number]>([0, 0]);

  const getBlock = (coord: Coord): Square | Edge | Corner => {
    const [x, y] = coord;
    return game.board[x][y];
  };

  // Called by edge and square view
  const clicked = () => {
    const block: Block = getBlock(hoveredEdge);
    if (block.blockType === "edge" && !block.isSelected) {
      gridlines.move(block);
      rerender();
      console.log("rerender");
    }
  };

  // Called by SquareView
  const reportMousePosition = (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => {
    const target = event.target as HTMLElement;
    const horiz = event.clientX - target.offsetLeft;
    const vert = event.clientY - target.offsetTop;
    const width = target.offsetWidth;
    const height = target.offsetHeight;

    const x = horiz > (3 * width) / 4 ? 1 : horiz < width / 4 ? -1 : 0;
    const y = vert > (3 * height) / 4 ? 1 : vert < height / 4 ? -1 : 0;

    const [k, i] = coord;
    const [hx, hy] = hoveredEdge;

    if (k + x !== hx) {
      setHoveredEdge([k + x, i]);
    } else if (i + y !== hy) {
      setHoveredEdge([k, i + y]);
    }

  };

  return (
    <>
    <div>{game.turn}</div>
    <div>{game.player1Score}</div>
    <div>{game.player2Score}</div>
    <BoardView
      grid={game.board}
      gameState={game}
      clicked={clicked}
      reportPosition={reportMousePosition}
      hoveredEdge={hoveredEdge}
    />
    </>
  );
}