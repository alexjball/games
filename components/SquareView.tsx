import React, { useEffect, useRef, useState } from "react";
import { Coord } from "../game/chess2";
import { Player } from "../game/gridlines";


export type SquarePropsType = {
  coord: Coord;
  isCaptured: boolean;
  capturedBy: Player | null;
  sidesSelected: number;
  index: number;
  onclick: () => void;
  reportPosition: (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => void;
};


export function SquareView(props: SquarePropsType) {
  const { index, coord, isCaptured, capturedBy, sidesSelected, onclick, reportPosition } = props;
  const squareRef = useRef<HTMLDivElement>(null);

  const [displayText, setDisplayText] = useState<number | string>("");

  const style = {
    gridColumnStart: coord[0] + 2,
    gridRowStart: coord[1] + 2,
  };

  useEffect(() => {
    capturedBy && setDisplayText(capturedBy);
  }, [capturedBy]);

  return (
    <div
      className={`square ${isCaptured ? "captured" : ""} ${displayText === 1 ? "player1" : displayText === 2 ? "player2" : ""}`}
      ref={squareRef}
      style={style}
      onClick={() => onclick()}
      onMouseMove={(event) => reportPosition(event, coord)}
    >
      <div className="square-label"><p>{displayText}</p></div>
    </div>
  );
}
