import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Coord } from "../game/chess2";
import { GameState, Gridlines, Board, SquareState, SquareType, Player } from "../game/gridlines";
import game from "../redux/game";
import "../styles/globals.css";
import "../styles/gridlines.css";

export default function GridlinesView(props: { size: number }) {
  const { size } = props;
  const game = new Gridlines(size);

  return (
    <div id='gridlines' className='board-grid'>
      {game.board.grid.map((row, i) =>
        row.map((sq, k) => <Square key={k + "" + i} index={i} {...sq} />)
      )}
    </div>
  );
}

export type SquarePropsType = {
  coord: Coord;
  clickedSides: number[];
  isCaptured: boolean;
  capturedBy: Player | null;
  clicks: number;
  clicked: (side: string) => void;
  index: number;
};

export function Square(props: SquarePropsType) {
  const { index, coord, clickedSides, isCaptured, capturedBy, clicks, clicked } = props;
  const squareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coord>([0, 0]);
  const border = "6px solid purple";

  const getClosestBorder = (mousePosition: Coord): string | void => {
    if (!squareRef.current || !mousePosition) return;
    const [mx, my] = mousePosition;

    const { clientHeight, clientWidth } = squareRef.current;

    const closestBorder = isHovered
      ? my < clientHeight / 4
        ? "borderTop"
        : mx > (3 * clientWidth) / 4
        ? "borderRight"
        : my > (3 * clientHeight) / 4
        ? "borderBottom"
        : mx < clientWidth / 4
        ? "borderLeft"
        : ""
      : "";

    return closestBorder;
  };

  const borders = ["borderTop", "borderRight", "borderBottom", "borderLeft"];
  const capturedBorders = borders.filter((name, i) => clickedSides[i] === 1)
  const closestBorder = getClosestBorder(mousePosition);
  const borderStyle: {[name:string]: string} = {}
  capturedBorders.forEach(side => {
    borderStyle[side] = border
  })
  

  const style = {
    gridColumnStart: coord[0] + 2,
    gridRowStart: coord[1] + 2,
    zIndex: 10,
    [closestBorder as string]: border,
    ...borderStyle
  };

  const getMousePositionOverSquare = (event: React.MouseEvent) => {
    const target = event.target as HTMLDivElement;
    setMousePosition([event.clientX - target.offsetLeft, event.clientY - target.offsetTop]);
  };

  const updateHovered = (event: React.MouseEvent, hoveredState: boolean) => {
    const hoverPosition = getMousePositionOverSquare(event);
    setIsHovered(hoveredState);
  };

  return (
    <div
      className={"square"}
      ref={squareRef}
      style={style}
      onClick={() => {
        clicked(closestBorder as string);
      }}
      onMouseEnter={(event: React.MouseEvent) => updateHovered(event, true)}
      onMouseMove={(event: React.MouseEvent) => getMousePositionOverSquare(event)}
      onMouseLeave={(event: React.MouseEvent) => updateHovered(event, false)}
    >
      {isCaptured ? "yes" : "no"}
    </div>
  );
}
