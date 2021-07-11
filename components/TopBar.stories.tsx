import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import TopBar from "./TopBar";

export default {
  title: "TopBar",
  component: TopBar,
} as ComponentMeta<typeof TopBar>;

const Template: ComponentStory<typeof TopBar> = (args) => <TopBar {...args} />;

export const Default = Template.bind({});
