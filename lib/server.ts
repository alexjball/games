import "reflect-metadata"
import { buildSchemaSync } from "type-graphql"
import { TicTacToeResolver } from "./tictactoe/server"

export const schema = buildSchemaSync({
  resolvers: [TicTacToeResolver],
})
