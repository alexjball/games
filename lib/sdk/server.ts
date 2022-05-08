import * as generated from "./graphql.generated"
import { GraphQLClient } from "./GraphQLClient"

export * from "./graphql.generated"

export type Sdk = generated.Sdk & {
  subscribeToGameState(
    update: (state: generated.TicTacToe) => void,
    error?: (e: any) => void,
  ): Unsubscribe
}
export type Unsubscribe = () => void

export function getSdk(): Sdk {
  const url = process.env.NEXT_PUBLIC_API_URL
  if (!url) throw Error("Please set NEXT_PUBLIC_API_URL environment variable")

  const client = new GraphQLClient(url)
  return {
    ...generated.getSdk(client),
    subscribeToGameState(update, error) {
      return client.subscribe<generated.TicTacToe>({
        query: generated.GameStateDocument,
        next: state => update(state),
        error: e => error?.(e),
      })
    },
  }
}
