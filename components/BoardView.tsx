import React from "react";
import { BoardPropsType } from "../Types/gridlinesTypes";
import { CornerView } from "./CornerView";
import { EdgeView } from "./EdgeView";
import { SquareView } from "./SquareView";



export function BoardView(props: BoardPropsType) {
  const { gameState, clicked, reportMousePosition, hoveredEdge } = props;

  return (
    <div id='gridlines' className='board-grid'>
      {gameState.board.map((row, c) => row.map((blk, r) => {
        if (blk.blockType === "square") {
          return (
            <SquareView
              key={c + "" + r}
              coord={[c, r]}
              onclick={clicked}
              index={r}
              sidesSelected={blk.sidesSelected}
              isCaptured={blk.isCaptured}
              capturedBy={blk.capturedBy}
              reportMousePosition={reportMousePosition} />
          );
        } else if (blk.blockType === "edge") {
          const [x, y] = hoveredEdge;
          return (
            <EdgeView
              key={c + "" + r}
              onclick={clicked}
              hovered={x === c && y === r}
              isSelected={blk.isSelected}
              coord={[c, r]} 
              reportMousePosition={reportMousePosition} />
          );
        } else if (blk.blockType === "corner") {
          return <CornerView key={c + "" + r} coord={[c, r]} />;
        }
      })
      )}
    </div>
  );
}
