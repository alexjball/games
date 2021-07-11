import React from "react";
import { SquareState, Stone } from "../game/reversi";
import StonePiece from "./StonePiece";

export interface BoardSquareProps {
  squarestate: SquareState;
  isLastMove?: boolean;
  isValidMove?: boolean;
  onclick: () => void;
}

export default function BoardSquare(props: BoardSquareProps) {
  const { squarestate, isLastMove, isValidMove, onclick} = props;

  let b: Stone;

  if (squarestate === "black") {
    b = squarestate;
  }

  const style: React.CSSProperties = {
    height: "12%",
    width: "12%",
    outline: "1px solid brown",
    float: "left",
    backgroundColor: "tan",
    boxShadow: "3px 3px 20px 4px #08070833 inset ",
  };

  return (
    <div style={style} onClick={onclick}>
      {isValidMove && (
        <div
          style={{
            height: "20%",
            width: "20%",
            borderRadius: "50%",
            backgroundColor: "#f5f5ff",
            margin: "50% 0 0 50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {" "}
        </div>
      )}
      {isLastMove && (
        <div
          style={{
            height: "20%",
            width: "20%",
            borderRadius: "50%",
            backgroundColor: "#45f",
            margin: "50% 0 0 50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {" "}
        </div>
      )}
      {squarestate !== "empty" && <StonePiece stone={squarestate} />}
    </div>
  );
}
