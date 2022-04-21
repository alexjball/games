import React from "react";
import game from "../redux/game";
import { BoardPropsType } from "../Types/gridlinesTypes";
import { CornerView } from "./CornerView";
import { EdgeView } from "./EdgeView";
import { SquareView } from "./SquareView";



export function BoardView(props: BoardPropsType) {
  const {gridlines, gameState, clicked, reportMousePosition, hoveredEdge } = props;

  const boardGridTemplate = {
    gridTemplateColumns: `8fr repeat(${Math.ceil(gridlines.size / 2)}, 1fr 8fr)) 1fr`,
    gridTemplateRows: `8fr repeat(${Math.ceil(gridlines.size / 2)}, 1fr 8fr)) 1fr`,
  }

  return (
    <div id='gridlines' className='board-grid' style={boardGridTemplate}>
      {gameState.board.map((row, r) => row.map((blk, c) => {
        if (gridlines.isSquare(blk)) {
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
        } else if (gridlines.isEdge(blk)) {
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
        } else   {
          return <CornerView key={c + "" + r} coord={[c, r]} />;
        }
      })
      )}
    </div>
  );
}
