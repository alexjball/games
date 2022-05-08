import { createServer } from "@graphql-yoga/node"
import { NextApiRequest, NextApiResponse } from "next"
import { buildSchemaSync } from "type-graphql"
import { pubSub } from "./pubsub"
import { TicTacToeResolver } from "./tictactoe"

const schema = buildSchemaSync({
  pubSub,
  resolvers: [TicTacToeResolver],
})

export const server = createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  logging: {
    debug: () => {}, //console.debug,
    info: () => {}, //console.log,
    warn: console.warn,
    error: console.error,
  },
})
