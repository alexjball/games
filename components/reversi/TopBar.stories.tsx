import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import TopBar from "./TopBar"

export default {
  component: TopBar,
} as ComponentMeta<typeof TopBar>

const Template: ComponentStory<typeof TopBar> = () => <TopBar />

export const Default = Template.bind({})
