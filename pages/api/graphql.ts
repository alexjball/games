// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServer } from "@graphql-yoga/node"
import { NextApiRequest, NextApiResponse } from "next"
import { schema } from "../../lib/tictactoe"

const server = createServer<{
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

export default server
