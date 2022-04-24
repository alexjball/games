import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { initialGameState } from "../../lib/reversi"
import { ControlPanel } from "./GameControls"

export default {
  component: ControlPanel,
} as ComponentMeta<typeof ControlPanel>

const Template: ComponentStory<typeof ControlPanel> = args => (
  <ControlPanel {...args} />
)

export const GameControl = Template.bind({})

const ControlPanelArgs = {
  gamestate: initialGameState(),
  setShouldShowLastMove: true,
  setShouldShowValidMoves: true,
  side: 706,
  newGame: () => {},
  pass: () => {},
  title: "button",
  onclick: () => {},
}

GameControl.args = ControlPanelArgs
