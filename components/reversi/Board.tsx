import React from "react"
import { GameState, Location } from "../../lib/reversi"
import BoardSquare from "./BoardSquare"

export interface BoardProps {
  gamestate: GameState
  side: number
  shouldShowLastMove: boolean
  shouldShowValidMoves: boolean
  onMove: (r: number, c: number) => void
}

function findLocation(locations: Location[], square: number[]): number {
  return locations.findIndex(
    location => location[0] === square[0] && location[1] === square[1],
  )
}

export default function Board(props: BoardProps) {
  const { side, gamestate, shouldShowLastMove, shouldShowValidMoves, onMove } =
    props
  const { board, validMoves, lastMove, state } = gamestate

  const lastMoveLocations: Location[] =
    lastMove?.map(move => [move.r, move.c] as Location) ?? []

  const squares = []
  for (let row = 0; row < board.length; row++) {
    for (let block = 0; block < board.length; block++) {
      squares.push({
        row,
        block,
        squarestate: board[row][block],
        isValidMove:
          shouldShowValidMoves && findLocation(validMoves, [row, block]) >= 0,
        isLastMove:
          shouldShowLastMove &&
          findLocation(lastMoveLocations, [row, block]) >= 0,
        isLastPlaced:
          shouldShowLastMove &&
          findLocation(lastMoveLocations, [row, block]) == 0,
        onclick: () => {
          onMove(row, block)
        },
      })
    }
  }

  return (
    <div className="board" style={{ height: side, width: side }}>
      {squares.map(square => {
        const {
          row,
          block,
          squarestate,
          isValidMove,
          isLastMove,
          isLastPlaced,
          onclick,
        } = square

        return (
          <BoardSquare
            key={`${row}${block}`}
            squarestate={squarestate}
            isValidMove={isValidMove}
            isLastMove={isLastMove}
            isLastPlaced={isLastPlaced}
            onclick={onclick}
          />
        )
      })}
    </div>
  )
}
