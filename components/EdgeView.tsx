import React from "react";
import { Coord } from "../game/chess2";


export type EdgePropsType = {
  isSelected: boolean;
  coord: Coord;
  hovered: boolean;
  onclick: (coord: Coord) => void;
};

export function EdgeView(props: EdgePropsType) {
  const { coord, onclick, isSelected, hovered } = props;

  const style = {
    gridColumnStart: coord[0] + 2,
    gridRowStart: coord[1] + 2,
    zIndex: 10,
  };

  return (
    <div
      className={`edge ${isSelected ? "selected" : ""} ${hovered ? "incoming" : ""}`}
      style={style}
      onClick={() => {
        onclick(coord);
      }}
    ></div>
  );
}
