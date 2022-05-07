import { waitFor } from "@testing-library/react"
import {
  MoveMutationVariables,
  Player,
  Square,
  Status,
} from "../graphql.generated"
import { testServer } from "../testUtils"

const sdk = testServer()

beforeEach(() => sdk.NewGame({ start: Player.X }))

it("fetches the state", async () => {
  const result = await sdk.TicTacToeState()
  expect(result).toMatchSnapshot()
})

it("calculates wins", async () => {
  const { state } = await applyMoves(
    { player: Player.X, col: 1, row: 1 },
    { player: Player.O, col: 1, row: 0 },
    { player: Player.X, col: 0, row: 0 },
    { player: Player.O, col: 2, row: 0 },
    { player: Player.X, col: 2, row: 2 },
  )

  expect(state.status).toEqual(Status.XWon)
  expect(state.turn).toEqual(Player.O)
})

it("calculates ties", async () => {
  const { state } = await applyMoves(
    { player: Player.X, col: 1, row: 1 },
    { player: Player.O, col: 1, row: 0 },
    { player: Player.X, col: 2, row: 0 },
    { player: Player.O, col: 0, row: 0 },
    { player: Player.X, col: 0, row: 1 },
    { player: Player.O, col: 2, row: 1 },
    { player: Player.X, col: 2, row: 2 },
    { player: Player.O, col: 0, row: 2 },
    { player: Player.X, col: 1, row: 2 },
  )

  expect(state.status).toEqual(Status.Tie)
  expect(state.turn).toEqual(Player.O)
})

test("subscription recieves initial state", async () => {
  const onUpdate = jest.fn()
  const onError = jest.fn()
  const unsubscribe = await sdk.subscribeToGameState(onUpdate, onError)

  await waitFor(() => expect(onUpdate).toHaveBeenCalledTimes(1))
  expect(onError).toHaveBeenCalledTimes(0)

  unsubscribe()
})

it("subscribes to updates", async () => {
  const onUpdate = jest.fn()
  const onError = jest.fn()
  const unsubscribe = sdk.subscribeToGameState(onUpdate, onError)

  await applyMoves(
    { player: Player.X, col: 1, row: 1 },
    { player: Player.O, col: 1, row: 0 },
  )

  unsubscribe()

  expect(onError).toHaveBeenCalledTimes(0)
  expect(onUpdate).toHaveBeenCalledTimes(3)

  let state = onUpdate.mock.calls[0][0].gameState
  expect(state.turn).toEqual(Player.X)
  expect(state.board[1][1]).toEqual(Square.Empty)
  expect(state.board[0][1]).toEqual(Square.Empty)

  state = onUpdate.mock.calls[1][0].gameState
  expect(state.turn).toEqual(Player.O)
  expect(state.board[1][1]).toEqual(Square.X)

  state = onUpdate.mock.calls[2][0].gameState
  expect(state.turn).toEqual(Player.X)
  expect(state.board[0][1]).toEqual(Square.O)
})

const applyMoves = async (...moves: MoveMutationVariables[]) => {
  for (const move of moves) {
    await sdk.Move(move)
  }

  return sdk.TicTacToeState()
}
