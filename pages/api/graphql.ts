// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServer } from "@graphql-yoga/node"
import { NextApiRequest, NextApiResponse } from "next"
import { schema } from "../../lib/server"

const server = createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({ schema })

export default server
