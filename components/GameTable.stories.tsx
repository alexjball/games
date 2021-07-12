import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  GameState,
  Stone,
  SquareState,
  initialGameState,
} from "../game/reversi";

import Board from "./Board";
import GameTable from "./GameTable";
import { ScoreDisplay } from "./GameControls";

export default {
  title: "GameTable",
  component: Board,
} as ComponentMeta<typeof Board>;

const Template: ComponentStory<typeof GameTable> = (args) => (
  <GameTable {...args} />
);

const SubPart: ComponentStory<typeof ScoreDisplay> = (args) => (
  <ScoreDisplay {...args} />
);

export const Table = Template.bind({});
Table.args = { gamestate: initialGameState() };

export const Score = SubPart.bind({});
Score.args = { gamestate: initialGameState() };
