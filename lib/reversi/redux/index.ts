import { configureStore } from "@reduxjs/toolkit"
import { audio } from "./audio"
import { game } from "./game"

export * from "./audio"
export * from "./game"
export const createStore = () =>
  configureStore({
    reducer: {
      audio,
      game,
    },
  })
