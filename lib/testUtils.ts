import { GraphQLClient } from "graphql-request"
import { getSdk } from "./graphql.generated"

export const testServer = () => {
  return getSdk(new GraphQLClient("http://localhost:3100/api/graphql"))
}
