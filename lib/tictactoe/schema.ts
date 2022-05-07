import { buildSchemaSync } from "type-graphql"
import { pubSub } from "./pubsub"
import { TicTacToeResolver } from "./server"

export const schema = buildSchemaSync({
  pubSub,
  resolvers: [TicTacToeResolver],
})
