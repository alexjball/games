import { createStore } from "./index"
import * as t from "./tictactoe"

test("tictactoe works but state is not serializable", () => {
  const err = jest.fn()
  console.error = err
  const s = createStore()

  s.dispatch(t.newGame())
  s.dispatch(t.move({ r: 1, c: 1 }))

  expect(s.getState().tictactoe.game.board[1][1]).toEqual("X")

  expect(err).toBeCalledTimes(2)
  expect(err.mock.calls[0][0]).toMatch(
    "A non-serializable value was detected in the state"
  )
})
