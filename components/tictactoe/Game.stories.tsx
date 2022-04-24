import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Game } from "./Game"

export default {
  component: Game,
} as ComponentMeta<typeof Game>

const Template: ComponentStory<typeof Game> = () => <Game />

export const Default = Template.bind({})
