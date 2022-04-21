import React from "react";
import { EdgePropsType } from "../Types/gridlinesTypes";


export function EdgeView(props: EdgePropsType) {
  const { coord, onclick, isSelected, hovered, reportMousePosition } = props;

  const [c, r] = coord
  const style = {
    gridColumnStart: c + 2,
    gridRowStart: r + 2,
    zIndex: 10,
  };

  return (
    <div
      className={`edge ${isSelected ? "selected" : ""} ${hovered ? "incoming" : ""}`}
      style={style}
      onClick={() => onclick() }
      onMouseMove={(event) => reportMousePosition(event, coord)}
    ></div>
  );
}
