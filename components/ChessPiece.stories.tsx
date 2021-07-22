import React, { Component } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ChessPiece from "./ChessPiece";
import { PieceType } from "../game/pieces";

export default {
  title: "ChessPiece",
  component: ChessPiece,
} as ComponentMeta<typeof ChessPiece>;

const KingTemplate: ComponentStory<typeof ChessPiece> = (args) => <ChessPiece {...args} />;

export const King = KingTemplate.bind({});

const KingPieceArgs = {
  piecetype: "King" ,
}; 

King.args = KingPieceArgs;



const QueenTemplate: ComponentStory<typeof ChessPiece> = (args) => <ChessPiece {...args} />;

export const Queen = QueenTemplate.bind({});

const QueenPieceArgs = {
  piecetype: "Queen" ,
}; 

Queen.args = QueenPieceArgs;

const RookTemplate: ComponentStory<typeof ChessPiece> = (args) => <ChessPiece {...args} />;

export const Rook = RookTemplate.bind({});

const RookPieceArgs = {
  piecetype: "Rook" ,
}; 

Rook.args = RookPieceArgs;
