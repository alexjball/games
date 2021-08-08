import React, { useState } from "react";
import { Gridlines } from "../game/gridlines";
import { Block, Coord, Corner, Edge, GameState, Square } from "../Types/gridlinesTypes";
import "../styles/globals.css";
import "../styles/gridlines.css";
import { BoardView } from "./BoardView";
import { EdgeView } from "./EdgeView";

export default function GridlinesView(props: { size: number }) {
  const [gridlines] = useState(() => new Gridlines(props.size));
  const [game, setGame] = useState<GameState>(() => gridlines.toJSON());
  const rerender = () => setGame(gridlines.toJSON());

  const [hoveredEdge, setHoveredEdge] = useState<Coord>([0, 0]);

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

  const reportMousePosition = (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => {
    const block = getBlock(coord);
    let closestEdge: Coord | null;

    if (block.blockType === "edge") {
      closestEdge = coord;
    } else {
      const target = event.target as HTMLElement;

      const horiz = event.clientX - target.offsetLeft;
      const vert = event.clientY - target.offsetTop;
      const width = target.offsetWidth;
      const height = target.offsetHeight;

      const x = horiz > (2 * width) / 3 ? 1 : horiz < width / 3 ? -1 : 0;
      const y = vert > (2 * height) / 3 ? 1 : vert < height / 3 ? -1 : 0;

      const [c, r] = coord;
      const [hx, hy] = hoveredEdge;

      closestEdge = c + x !== hx ? [c + x, r] : r + y !== hy ? [c, r + y] : null;
    }
    closestEdge && closestEdge !== hoveredEdge && setHoveredEdge(closestEdge);
  };

  return (
    <>
      <div className='control'>Turn: {game.turn}</div>
      <div className='control'>Player 1 score: {game.player1Score}</div>
      <div className='control'>Player 2 score: {game.player2Score}</div>
      <BoardView
        gameState={game}
        clicked={clicked}
        reportMousePosition={reportMousePosition}
        hoveredEdge={hoveredEdge}
      />
    </>
  );
}
