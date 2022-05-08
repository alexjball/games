import { useState } from "react"
import styled from "styled-components"
import {
  TicTacToe,
  useClient,
  useGameStateSubscription,
  useMoveMutation,
  useNewGameMutation,
} from "../../lib/sdk/client"
import { Alert, Button, Col, Container, Form, Row } from "../bootstrap"

// Demonstrate use of styled-components
const Title = styled.h1`
  border: solid black;
`

export const Game = () => {
  const state = useGameStateSubscription(useClient())
  const [error, onError] = useState<any>(null)

  return (
    <Container className="mt-2">
      <Row>
        <Col>
          <Title>TicTacToe</Title>
        </Col>
      </Row>

      {state.data && (
        <Controls state={state.data.gameState} onError={onError} />
      )}

      <ErrorDisplay error={error} />

      <Row>
        <Col>
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        </Col>
      </Row>
    </Container>
  )
}

const ErrorDisplay = ({ error }: { error: any }) => {
  if (!error) return null

  const defaultMessage = "Something went wrong"
  const message =
    typeof error === "string"
      ? error
      : typeof error === "object"
      ? // GraphQL errors
        error.response?.errors?.[0]?.extensions?.originalError?.message ??
        error.message ??
        defaultMessage
      : defaultMessage

  return (
    <Row>
      <Col>
        <Alert variant="danger">{message}</Alert>
      </Col>
    </Row>
  )
}

const Controls = ({
  state,
  onError,
}: {
  state: TicTacToe
  onError: (e: any) => void
}) => {
  const errorHandler = { onError, onSuccess: () => onError(null) }
  const newGame = useNewGameMutation(useClient(), errorHandler)
  const move = useMoveMutation(useClient(), errorHandler)

  return (
    <>
      <Form
        className="mb-3"
        onSubmit={e => {
          e.preventDefault()

          const form = e.currentTarget
          const el = form.elements as any
          if (form.checkValidity()) {
            move.mutate({
              player: state.turn,
              row: Number(el.row.value),
              col: Number(el.column.value),
            })
          }
        }}
      >
        <Row>
          <Form.Group as={Col} controlId="row">
            <Form.Label>Row</Form.Label>
            <Form.Control type="number" min={0} max={2} required />
          </Form.Group>
          <Form.Group as={Col} controlId="column">
            <Form.Label>Column</Form.Label>
            <Form.Control type="number" min={0} max={2} required />
          </Form.Group>
          <Col className="mt-auto">
            <Button className="mx-auto" type="submit">
              Move {state.turn}
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="mb-3">
        <Col>
          <Button
            disabled={newGame.isLoading}
            onClick={() => newGame.mutate({ start: state.turn })}
          >
            New Game {state.turn}
          </Button>
        </Col>
      </Row>
    </>
  )
}
