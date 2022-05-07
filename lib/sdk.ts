import EventSource from "eventsource"
import { gql, GraphQLClient } from "graphql-request"
import * as generated from "./graphql.generated"

export const getSdk = (() => {
  let sdk: Sdk | null = null
  return () => (sdk = sdk ?? createSdk())
})()

function createSdk(): Sdk {
  const url = process.env.API_URL ?? "http://localhost:3000/api/graphql"
  if (typeof url !== "string")
    throw Error("Please specify API_URL environment variable")

  const base = generated.getSdk(new GraphQLClient(url))
  const sseClient = new SseClient(url)
  return {
    sseClient,
    apiUrl: url,
    ...base,
    subscribeToGameState(update, error) {
      return sseClient.subscribe<generated.TicTacToe>({
        query: gql`
          subscription GameState {
            gameState {
              board
              status
              turn
            }
          }
        `,
        next: state => update(state),
        error: e => error?.(e),
      })
    },
  }
}

type Sdk = generated.Sdk & {
  subscribeToGameState(
    update: (state: generated.TicTacToe) => void,
    error?: (e: any) => void,
  ): Unsubscribe
  sseClient: SseClient
  apiUrl: string
}

type Unsubscribe = () => void
class SseClient {
  constructor(private url: string) {}

  subscribe<T>({
    query,
    next,
    error,
  }: {
    query: string
    next: (state: T) => void
    error: (e: any) => void
  }) {
    const url = new URL(this.url)
    url.searchParams.append("query", query)
    const eventSource = new EventSource(url.toString(), {
      withCredentials: true, // This is required for cookies
    })

    eventSource.onmessage = m => void (m.data && next(JSON.parse(m.data).data))
    eventSource.onerror = e => void error(e)
    return () => eventSource.close()
  }
}
