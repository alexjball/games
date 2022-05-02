import { MoveMutationVariables, Player, Status } from "../graphql.generated"
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

const applyMoves = async (...moves: MoveMutationVariables[]) => {
  for (const move of moves) {
    await sdk.Move(move)
  }

  return sdk.TicTacToeState()
}
