import React from "react";
import { Coord, Corner, Edge, GameState, Square } from "../game/gridlines";
import { CornerView } from "./CornerView";
import { EdgeView } from "./EdgeView";
import { SquareView } from "./SquareView";



export type BoardPropsType = {
  grid: (Square | Edge | Corner)[][];
  gameState: GameState;
  clicked: () => void;
  reportPosition: (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => void;
  hoveredEdge: Coord;
};

export function BoardView(props: BoardPropsType) {
  const { grid, gameState, clicked, reportPosition, hoveredEdge } = props;

  return (
    <div id='gridlines' className='board-grid'>
      {grid.map((row, k) => row.map((blk, i) => {
        if (blk.blockType === "square") {
          const { sidesSelected, isCaptured, capturedBy } = blk;
          return (
            <SquareView
              key={k + "" + i}
              coord={[k, i]}
              onclick={clicked}
              index={i}
              sidesSelected={sidesSelected}
              isCaptured={isCaptured}
              capturedBy={capturedBy}
              reportPosition={reportPosition} />
          );
        } else if (blk.blockType === "edge") {
          const { isSelected } = blk;
          const [x, y] = hoveredEdge;
          return (
            <EdgeView
              key={k + "" + i}
              isSelected={isSelected}
              hovered={x === k && y === i}
              onclick={clicked}
              coord={[k, i]} />
          );
        } else if (blk.blockType === "corner") {
          return <CornerView key={k + "" + i} coord={[k, i]} />;
        }
      })
      )}
    </div>
  );
}
