import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import TopBar from "./TopBar"

export default {
  title: "TopBar",
  component: TopBar,
} as ComponentMeta<typeof TopBar>

const Template: ComponentStory<typeof TopBar> = () => <TopBar />

export const Default = Template.bind({})
