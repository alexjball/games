import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import GridlinesView from "../components/GridLines";

export default {
  title: "GridLines",
  component: GridlinesView,
} as ComponentMeta<typeof GridlinesView>;

const Template: ComponentStory<typeof GridlinesView> = (args) => <GridlinesView {...args} />;

export const GridlinesStory = Template.bind({});
GridlinesStory.args = {size: 15}