import { GraphQLClient } from "graphql-request"
import { RequestInit } from "graphql-request/dist/types.dom"
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "react-query"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"],
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers)
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  __typename?: "Mutation"
  move: TicTacToe
  newGame: TicTacToe
}

export type MutationMoveArgs = {
  col: Scalars["Float"]
  player: Player
  row: Scalars["Float"]
}

export type MutationNewGameArgs = {
  start: Player
}

export enum Player {
  O = "O",
  X = "X",
}

export type Query = {
  __typename?: "Query"
  state: TicTacToe
}

export enum Square {
  Empty = "Empty",
  O = "O",
  X = "X",
}

export enum Status {
  InProgress = "InProgress",
  OWon = "OWon",
  PreGame = "PreGame",
  Tie = "Tie",
  XWon = "XWon",
}

export type Subscription = {
  __typename?: "Subscription"
  gameState: TicTacToe
}

export type TicTacToe = {
  __typename?: "TicTacToe"
  board: Array<Array<Square>>
  status: Status
  turn: Player
}

export type TicTacToeStateQueryVariables = Exact<{ [key: string]: never }>

export type TicTacToeStateQuery = {
  __typename?: "Query"
  state: {
    __typename?: "TicTacToe"
    board: Array<Array<Square>>
    turn: Player
    status: Status
  }
}

export type GameStateSubscriptionVariables = Exact<{ [key: string]: never }>

export type GameStateSubscription = {
  __typename?: "Subscription"
  gameState: {
    __typename?: "TicTacToe"
    board: Array<Array<Square>>
    turn: Player
    status: Status
  }
}

export type MoveMutationVariables = Exact<{
  player: Player
  row: Scalars["Float"]
  col: Scalars["Float"]
}>

export type MoveMutation = {
  __typename?: "Mutation"
  move: {
    __typename?: "TicTacToe"
    board: Array<Array<Square>>
    turn: Player
    status: Status
  }
}

export type NewGameMutationVariables = Exact<{
  start: Player
}>

export type NewGameMutation = {
  __typename?: "Mutation"
  newGame: {
    __typename?: "TicTacToe"
    board: Array<Array<Square>>
    turn: Player
    status: Status
  }
}

export type FieldsFragment = {
  __typename?: "TicTacToe"
  board: Array<Array<Square>>
  turn: Player
  status: Status
}

export const FieldsFragmentDoc = `
    fragment Fields on TicTacToe {
  board
  turn
  status
}
    `
export const TicTacToeStateDocument = `
    query TicTacToeState {
  state {
    ...Fields
  }
}
    ${FieldsFragmentDoc}`
export const useTicTacToeStateQuery = <
  TData = TicTacToeStateQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables?: TicTacToeStateQueryVariables,
  options?: UseQueryOptions<TicTacToeStateQuery, TError, TData>,
  headers?: RequestInit["headers"],
) =>
  useQuery<TicTacToeStateQuery, TError, TData>(
    variables === undefined
      ? ["TicTacToeState"]
      : ["TicTacToeState", variables],
    fetcher<TicTacToeStateQuery, TicTacToeStateQueryVariables>(
      client,
      TicTacToeStateDocument,
      variables,
      headers,
    ),
    options,
  )
export const GameStateDocument = `
    subscription GameState {
  gameState {
    ...Fields
  }
}
    ${FieldsFragmentDoc}`
export const MoveDocument = `
    mutation Move($player: Player!, $row: Float!, $col: Float!) {
  move(player: $player, row: $row, col: $col) {
    ...Fields
  }
}
    ${FieldsFragmentDoc}`
export const useMoveMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    MoveMutation,
    TError,
    MoveMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"],
) =>
  useMutation<MoveMutation, TError, MoveMutationVariables, TContext>(
    ["Move"],
    (variables?: MoveMutationVariables) =>
      fetcher<MoveMutation, MoveMutationVariables>(
        client,
        MoveDocument,
        variables,
        headers,
      )(),
    options,
  )
export const NewGameDocument = `
    mutation NewGame($start: Player!) {
  newGame(start: $start) {
    ...Fields
  }
}
    ${FieldsFragmentDoc}`
export const useNewGameMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    NewGameMutation,
    TError,
    NewGameMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"],
) =>
  useMutation<NewGameMutation, TError, NewGameMutationVariables, TContext>(
    ["NewGame"],
    (variables?: NewGameMutationVariables) =>
      fetcher<NewGameMutation, NewGameMutationVariables>(
        client,
        NewGameDocument,
        variables,
        headers,
      )(),
    options,
  )
