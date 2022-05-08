import { useEffect, useMemo, useState } from "react"
import { createService } from "../service"
import { GraphQLClient } from "./GraphQLClient"
import {
  GameStateDocument,
  GameStateSubscription,
} from "./react-query.generated"

export * from "./react-query.generated"

export const { Provider: GraphQLClientProvider, useServiceChecked: useClient } =
  createService(
    () =>
      new GraphQLClient(
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/graphql",
      ),
  )

const createSubscriptionHook =
  <T>(query: string) =>
  (client: GraphQLClient) => {
    const [data, setValue] = useState<T | undefined>(undefined)
    const [error, setError] = useState<any>(undefined)
    useEffect(
      () =>
        client.subscribe<T>({
          query,
          next: setValue,
          error: setError,
        }),
      [client],
    )
    return useMemo(() => ({ data, error }), [data, error])
  }

export const useGameStateSubscription =
  createSubscriptionHook<GameStateSubscription>(GameStateDocument)
