import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { initialGameState } from "../../lib/reversi"
import Board from "./Board"
import { ScoreDisplay } from "./GameControls"
import GameTable from "./GameTable"

export default {
  component: Board,
} as ComponentMeta<typeof Board>

const Template: ComponentStory<typeof GameTable> = args => (
  <GameTable {...args} />
)

const SubPart: ComponentStory<typeof ScoreDisplay> = args => (
  <ScoreDisplay {...args} />
)

export const Table = Template.bind({})
Table.args = { gamestate: initialGameState() }

export const Score = SubPart.bind({})
Score.args = { gamestate: initialGameState() }
