import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import StonePiece from "./StonePiece"
import { Stone } from "../game/reversi"

export default {
  title: "StonePiece",
  component: StonePiece,
} as ComponentMeta<typeof StonePiece>

const Template: ComponentStory<typeof StonePiece> = args => (
  <StonePiece {...args} />
)

export const Stoneblack = Template.bind({})

Stoneblack.args = {
  stone: "black",
}
