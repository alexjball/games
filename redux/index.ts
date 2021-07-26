import { configureStore } from "@reduxjs/toolkit"
import audio from "./audio"
import game from "./game"
import tictactoe from "./tictactoe"
export const createStore = () =>
  configureStore({
    reducer: {
      audio,
      game,
      tictactoe,
    },
  })
