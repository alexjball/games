import React from "react";
import { Coord } from "../game/chess2";



export function CornerView(props: { coord: Coord; }) {
  const { coord } = props;
  const style = {
    gridColumnStart: coord[0] + 2,
    gridRowStart: coord[1] + 2,
  };
  return (
    <div className={"corner"} style={style}>
      {" "}
    </div>
  );
}
