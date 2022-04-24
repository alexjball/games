import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import StonePiece from "./StonePiece"

export default {
  component: StonePiece,
} as ComponentMeta<typeof StonePiece>

const Template: ComponentStory<typeof StonePiece> = args => (
  <StonePiece {...args} />
)

export const Stoneblack = Template.bind({})

Stoneblack.args = {
  stone: "black",
}
