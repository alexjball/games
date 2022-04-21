import React, { useState } from "react";
import { Gridlines } from "../game/gridlines";
import "../styles/globals.css";
import "../styles/gridlines.css";
import { Coord, Direction, Edge, GameState } from "../Types/gridlinesTypes";
import { BoardView } from "./BoardView";

export default function GridlinesView(props: { size: number }) {
  const [gridlines] = useState(() => new Gridlines(props.size));
  const [game, setGame] = useState<GameState>(() => gridlines.toJSON());
  const rerender = () => setGame(gridlines.toJSON());

  const [hoveredEdge, setHoveredEdge] = useState<Coord>([0, 0]);

  // Called by edge and square view
  const clicked = () => {
    gridlines.move(hoveredEdge);
    rerender();
  };

  const reportMousePosition = (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => {
    const target = event.target as HTMLElement;

    const horiz = event.clientX - target.offsetLeft;
    const vert = event.clientY - target.offsetTop;
    const width = target.offsetWidth;
    const height = target.offsetHeight;

    const x: Direction = horiz > (width / 3) * 2 ? 1 : horiz < width / 3 ? -1 : 0;
    const y: Direction = vert > (height / 3) * 2 ? 1 : vert < height / 3 ? -1 : 0;

    const [mc, mr] = gridlines.getHoveredEdge(coord, [x, y]);
    setHoveredEdge([mc, mr]);
  };

  return (
    <>
      <div className='control-panel'>
        {" "}
        <div className='control'>Turn: {game.turn}</div>
        <div className='control'>Player 1 score: {game.player1Score}</div>
        <div className='control'>Player 2 score: {game.player2Score}</div>
      </div>
      <div className='board-wrapper'>
        <BoardView
          gridlines={gridlines}
          gameState={game}
          clicked={clicked}
          reportMousePosition={reportMousePosition}
          hoveredEdge={hoveredEdge}
        />
      </div>
    </>
  );
}
