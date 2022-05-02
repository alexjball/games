import { GraphQLClient } from "graphql-request"
import * as Dom from "graphql-request/dist/types.dom"
import gql from "graphql-tag"
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

export const TicTacToeStateDocument = gql`
  query TicTacToeState {
    state {
      board
      turn
      status
    }
  }
`
export const MoveDocument = gql`
  mutation Move($player: Player!, $row: Float!, $col: Float!) {
    move(player: $player, row: $row, col: $col) {
      board
      turn
      status
    }
  }
`
export const NewGameDocument = gql`
  mutation NewGame($start: Player!) {
    newGame(start: $start) {
      board
      turn
      status
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    TicTacToeState(
      variables?: TicTacToeStateQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<TicTacToeStateQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<TicTacToeStateQuery>(
            TicTacToeStateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "TicTacToeState",
        "query",
      )
    },
    Move(
      variables: MoveMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<MoveMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<MoveMutation>(MoveDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Move",
        "mutation",
      )
    },
    NewGame(
      variables: NewGameMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<NewGameMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<NewGameMutation>(NewGameDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "NewGame",
        "mutation",
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
