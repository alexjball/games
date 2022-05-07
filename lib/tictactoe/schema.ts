import { buildSchemaSync } from "type-graphql"
import { TicTacToeResolver } from "./server"

export const schema = buildSchemaSync({
  resolvers: [TicTacToeResolver],
})
