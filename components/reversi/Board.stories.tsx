import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { initialGameState, Location } from "../../lib/reversi"
import Board from "./Board"

export default {
  component: Board,
} as ComponentMeta<typeof Board>

const Template: ComponentStory<typeof Board> = args => <Board {...args} />

export const ValidMoves = Template.bind({})

const validMoveState = {
  ...initialGameState(),
  validMoves: [[6, 4] as Location, [2, 4] as Location, [2, 5] as Location],
}
ValidMoves.args = {
  gamestate: validMoveState,
  side: innerWidth / 1.5,
  shouldShowValidMoves: true,
}
export const EmptyBoard = Template.bind({})
EmptyBoard.args = { gamestate: validMoveState, side: innerWidth / 1.5 }
