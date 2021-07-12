import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  GameState,
  Stone,
  SquareState,
  initialGameState,
  Location,
} from "../game/reversi";
import { ControlPanel } from "./GameControls";

export default {
  title: "GameControl",
  component: ControlPanel,
} as ComponentMeta<typeof ControlPanel>;

const Template: ComponentStory<typeof ControlPanel> = (args) => (
  <ControlPanel {...args} />
);

export const GameControl = Template.bind({});

const ControlPanelArgs = {
  gamestate: initialGameState(),
  setShouldShowLastMove: true,
  setShouldShowValidMoves: true,
  side: 706,
  newGame: () => {},
  pass: () => {},
  title: "button",
  onclick: () => {},
};

GameControl.args = ControlPanelArgs;
