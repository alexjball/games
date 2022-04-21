import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import MuteButton from "./MuteButton"

export default {
  title: "MuteButton",
  component: MuteButton,
} as ComponentMeta<typeof MuteButton>

const Template: ComponentStory<typeof MuteButton> = args => (
  <MuteButton {...args} />
)

export const Muted = Template.bind({})
Muted.args = { muted: true, onClick: () => console.log("click") }

export const NotMuted = Template.bind({})
NotMuted.args = { ...Muted.args, muted: false }
