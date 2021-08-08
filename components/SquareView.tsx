import React, { useRef } from "react";
import { SquarePropsType } from "../Types/gridlinesTypes";


export function SquareView(props: SquarePropsType) {
  const { coord, isCaptured, capturedBy, onclick, reportMousePosition: reportMousePosition } = props;
  const squareRef = useRef<HTMLDivElement>(null);


  const [c, r] = coord
  const style = {
    gridColumnStart: c + 2,
    gridRowStart: r + 2,
  };

  return (
    <div
      className={`square ${isCaptured ? "captured" : ""} ${
        capturedBy === 1 ? "player1" : capturedBy === 2 ? "player2" : ""
      }`}
      ref={squareRef}
      style={style}
      onClick={() => onclick()}
      onMouseMove={(event) => reportMousePosition(event, coord)}
    >
      <div className='square-label'>
        <p>{capturedBy}</p>
      </div>
    </div>
  );
}
