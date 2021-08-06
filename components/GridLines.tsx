import React, { useState } from "react";
import { Coord } from "../game/chess2";
import { Block, Corner, Edge, GameState, Gridlines, Square } from "../game/gridlines";
import "../styles/globals.css";
import "../styles/gridlines.css";
import { BoardView } from "./BoardView";

export default function GridlinesView(props: { size: number }) {
  const { size } = props;
  const gridlines: Gridlines = new Gridlines(size);
  const [game, setGame] = useState<GameState>(gridlines.gameState);
  const rerender = () => setGame({ ...game });
  const [hoveredEdge, setHoveredEdge] = useState<[number, number]>([0, 0]);

  const getBlock = (coord: Coord): Square | Edge | Corner => {
    const [x, y] = coord;
    return game.board[x][y];
  };

  const clicked = () => {
    const block: Block = getBlock(hoveredEdge);
    if (block.blockType === "edge") {
      if (block.isSelected) return;
      console.log("edge", hoveredEdge);
      block.isSelected = true;
      for (let c of block.neighbors) {
        const nBlk = getBlock(c);
        if (nBlk.blockType === "square") {
          nBlk.sideClick();
        }
      }
    }
    rerender();
    console.log("rerender");
  };

  const reportPosition = (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => {
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
      rerender();
    } else if (i + y !== hy) {
      setHoveredEdge([k, i + y]);
      rerender();
    }
  };

  return (
    <BoardView
      grid={game.board}
      gameState={game}
      clicked={clicked}
      reportPosition={reportPosition}
      hoveredEdge={hoveredEdge}
    />
  );
}