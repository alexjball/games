import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GameState, Gridlines } from "../game/gridlines";
import GridlinesView from "../components/GridLines";

export default {
  title: "GridLines",
  component: GridlinesView,
} as ComponentMeta<typeof GridlinesView>;

const Template: ComponentStory<typeof GridlinesView> = (args) => <GridlinesView {...args} />;

export const GridlinesStory = Template.bind({});
GridlinesStory.args = {size: 15}