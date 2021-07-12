import React from "react";
import { SquareState, Stone } from "../game/reversi";
import StonePiece from "./StonePiece";

export interface BoardSquareProps {
  squarestate: SquareState;
  isLastMove?: boolean;
  isValidMove?: boolean;
  isLastPlaced?: boolean;
  onclick: () => void;
}

export default function BoardSquare(props: BoardSquareProps) {
  const { squarestate, isLastMove, isValidMove, isLastPlaced, onclick } = props;

  const hasDecoration = isValidMove || isLastMove || isLastPlaced;

  return (
    <div className="board-square" onClick={onclick}>
      {squarestate !== "empty" && <StonePiece stone={squarestate} />}
      {hasDecoration && (
        <div
          className="square-decoration"
          style={{
            backgroundColor: isValidMove
              ? "#c74d4d"
              : isLastPlaced
              ? "#2e8d59"
              : "#3744d8",
          }}
        />
      )}
    </div>
  );
}
