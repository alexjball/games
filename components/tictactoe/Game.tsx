import styled from "styled-components"
import { Col, Container, Row } from "../bootstrap"

// Demonstrate use of styled-components
const Title = styled.h1`
  border: solid black;
`

export const Game = () => (
  <Container className="mt-2">
    <Row>
      <Col>
        <Title>TicTacToe</Title>
      </Col>
    </Row>
  </Container>
)
