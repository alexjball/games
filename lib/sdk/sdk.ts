import EventSource from "eventsource"
import { DocumentNode } from "graphql"
import { GraphQLClient } from "graphql-request"
import * as generated from "./graphql.generated"

export const getSdk = (() => {
  let sdk: Sdk | null = null
  return () => (sdk = sdk ?? createSdk())
})()

export const asQueryString = (q: DocumentNode | string) => {
  if (typeof q === "string") return q
  if (!q.loc) throw new Error("Query has no source")
  return q.loc.source.body
}

export type Sdk = generated.Sdk & {
  subscribeToGameState(
    update: (state: generated.TicTacToe) => void,
    error?: (e: any) => void,
  ): Unsubscribe
  apiUrl: string
}
export type Unsubscribe = () => void

function createSdk(): Sdk {
  const url = process.env.API_URL ?? "http://localhost:3000/api/graphql"
  if (typeof url !== "string")
    throw Error("Please specify API_URL environment variable")

  const base = generated.getSdk(new GraphQLClient(url))
  const sseClient = new SseClient(url)
  return {
    apiUrl: url,
    ...base,
    subscribeToGameState(update, error) {
      return sseClient.subscribe<generated.TicTacToe>({
        query: generated.GameStateDocument,
        next: state => update(state),
        error: e => error?.(e),
      })
    },
  }
}

class SseClient {
  constructor(private url: string) {}

  subscribe<T>({
    query,
    next,
    error,
  }: {
    query: string | DocumentNode
    next: (state: T) => void
    error: (e: any) => void
  }) {
    const url = new URL(this.url)
    url.searchParams.append("query", asQueryString(query))
    const eventSource = new EventSource(url.toString(), {
      withCredentials: true, // This is required for cookies
    })

    eventSource.onmessage = m => void (m.data && next(JSON.parse(m.data).data))
    eventSource.onerror = e => void error(e)
    return () => eventSource.close()
  }
}
