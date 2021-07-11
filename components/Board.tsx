import React from "react";
import {
  GameState,
  SquareState,
  Stone,
  Location,
  ReversiState,
} from "../game/reversi";
import StonePiece from "./StonePiece";
import BoardSquare from "./BoardSquare";

export interface BoardProps {
  gamestate: GameState;
  side: number;
  shouldShowLastMove: boolean;
  shouldShowValidMoves: boolean;
  onMove: (r: number, c: number) => void;
  state: ReversiState;
}

function matchLocation(locations: Location[], square: number[]) {
  return (
    locations.findIndex(
      (location) => location[0] === square[0] && location[1] === square[1]
    ) >= 0
  );
}

export default function Board(props: BoardProps) {
  const {
    side,
    gamestate,
    shouldShowLastMove,
    shouldShowValidMoves,
    onMove,
  } = props;
  const { board, validMoves, lastMove, state } = gamestate;

  const lastMoveLocations: Location[] =
    lastMove?.map((move) => [move.r, move.c] as Location) ?? [];

  const squares = [];
  console.log(side);
  for (let row = 0; row < board.length; row++) {
    for (let block = 0; block < board.length; block++) {
      squares.push({
        row,
        block,
        squarestate: board[row][block],
        isValidMove:
          shouldShowValidMoves && matchLocation(validMoves, [row, block]),
        isLastMove:
          shouldShowLastMove && matchLocation(lastMoveLocations, [row, block]),
        onclick: () => {
          onMove(row, block);
        },
      });
    }
  }

  const style: React.CSSProperties = {
    height: side,
    width: side,
    padding: "5%",
    float: "left",
  };

  return (
    <div style={style}>
      {state === "winner-white" || ("winner-black" && <div>{state}</div>)}
      {squares.map((square) => {
        const {
          row,
          block,
          squarestate,
          isValidMove,
          isLastMove,
          onclick,
        } = square;

        return (
          <BoardSquare
            key={`${row}${block}`}
            squarestate={squarestate}
            isValidMove={isValidMove}
            isLastMove={isLastMove}
            onclick={onclick}
          />
        );
      })}
    </div>
  );
}
