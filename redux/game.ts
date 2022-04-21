import { createSlice } from "@reduxjs/toolkit"
import { shallowEqual, useSelector } from "react-redux"
import { GameState, otherStone, Reversi, Stone } from "../game/reversi"

export interface ReduxGameState extends GameState {
  startingStone: Stone
}

const game = new Reversi()
game.newGame("black")

const initialState: ReduxGameState = {
  ...game.toJSON(),
  startingStone: "white",
}

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    move(state, { payload: { r, c } }) {
      if (game.isValidMove(r, c)) {
        game.move(r, c)
        return { ...state, ...game.toJSON() }
      }
    },
    pass(state) {
      game.pass()
      state.currentStone = game.currentStone
      state.lastMove = game.lastMove
      state.validMoves = game.validMoves
    },
    newGame(state) {
      game.newGame(state.startingStone)
      return {
        ...state,
        startingStone: otherStone(state.startingStone),
        ...game.toJSON(),
      }
    },
  },
})

export const useGame = () =>
  useSelector(({ game }: { game: GameState }) => game, shallowEqual)

export const { move, pass, newGame } = slice.actions
export default slice.reducer
