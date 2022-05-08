import EventSource from "eventsource"
import { DocumentNode } from "graphql"
import { GraphQLClient as Base } from "graphql-request"
import { asQueryString } from "../utils"

export class GraphQLClient extends Base {
  readonly apiUrl: string

  constructor(url: string, options?: RequestInit) {
    super(url, options)
    this.apiUrl = url
  }

  subscribe<T>({
    query,
    next,
    error,
  }: {
    query: string | DocumentNode
    next: (state: T) => void
    error: (e: any) => void
  }) {
    const url = new URL(this.apiUrl)
    url.searchParams.append("query", asQueryString(query))
    const eventSource = new EventSource(url.toString(), {
      withCredentials: true, // This is required for cookies
    })

    eventSource.onmessage = m => void (m.data && next(JSON.parse(m.data).data))
    eventSource.onerror = e => void error(e)
    return () => eventSource.close()
  }
}
