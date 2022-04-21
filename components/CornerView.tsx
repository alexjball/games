import React from "react";
import { Coord } from "../game/chess2";

export function CornerView(props: { coord: Coord }) {
  const { coord } = props;
  const [c, r] = coord;
  const style = {
    gridColumnStart: c + 2,
    gridRowStart: r + 2,
  };
  const onclick = () => console.log("corner", coord)
  return (
    <div className={"corner"} style={style} onClick={onclick}>
      {" "}
    </div>
  );
}
