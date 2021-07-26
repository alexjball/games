import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { Marker, otherMarker, TicTacToe } from "../game/tictactoe"

export interface State {
  game: TicTacToe
  startingMarker: Marker
}

const initialState: State = {
  game: new TicTacToe(),
  startingMarker: "X",
}

const slice = createSlice({
  name: "tictactoe",
  initialState,
  reducers: {
    move(state, { payload: { r, c } }) {
      state.game.move(r, c)
    },
    newGame(state) {
      state.game.newGame(state.startingMarker)
      state.startingMarker = otherMarker(state.startingMarker)
    },
  },
})

export const useTicTacToe = () =>
  useSelector(({ tictactoe }: { tictactoe: TicTacToe }) => tictactoe)

export const { move, newGame } = slice.actions
export default slice.reducer
