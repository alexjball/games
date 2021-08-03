import React, { useEffect, useReducer, useRef, useState } from "react";
import { Coord } from "../game/chess2";
import { Block, Edge, Gridlines, Player, Square, Corner } from "../game/gridlines";
import "../styles/globals.css";
import "../styles/gridlines.css";

export default function GridlinesView(props: { size: number }) {
  const { size } = props;
  const [game, setGame] = useState(new Gridlines(size));
  const rerender = () => setGame({ ...game });

  console.log("rerendering GridlinesView");

  const getBlock = (coord: Coord): Square | Edge | Corner => {
    const [x, y] = coord;
    return game.board.grid[x][y];
  };

  const clicked = (coord: Coord) => {
    const [x, y] = coord;
    const block: Block = getBlock(coord);
    if (block.blockType === "edge") {
      if (block.isSelected) return;
      block.isSelected = true;
      for (let c of block.neighbors) {
        const nBlk = getBlock(c);
        if (nBlk.blockType === "square") {
          nBlk.sideClick();
        }
      }
    }
    rerender();
    console.log("rerender");
  };

  return (
    <div>
      <div id='gridlines' className='board-grid'>
        {game.board.grid.map((row, i) =>
          row.map((blk, k) => {
            if (blk.blockType === "square") {
              const { sideClick, sidesSelected, isCaptured, capturedBy } = blk;
              return (
                <SquareView
                  key={k + "" + i}
                  coord={[k, i]}
                  onclick={clicked}
                  index={i}
                  sideClick={sideClick}
                  sidesSelected={sidesSelected}
                  isCaptured={isCaptured}
                  capturedBy={capturedBy}
                />
              );
            } else if (blk.blockType === "edge") {
              const { isSelected } = blk;
              return (
                <EdgeView
                  key={k + "" + i}
                  isSelected={isSelected}
                  onclick={clicked}
                  coord={[k, i]}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
}

export type EdgePropsType = {
  isSelected: boolean;
  coord: Coord;
  onclick: (coord: Coord) => void;
};

export function EdgeView(props: EdgePropsType) {
  const { coord, onclick, isSelected } = props;

  const [selectedState, setSelectedState] = useState<boolean>(isSelected);

  const style = {
    gridColumnStart: coord[0] + 2,
    gridRowStart: coord[1] + 2,
    zIndex: 10,
  };

  return (
    <div
      className={`edge ${selectedState ? "selected" : ""}`}
      style={style}
      onClick={() => {
        onclick(coord);
        setSelectedState(true);
      }}
    ></div>
  );
}

export type SquarePropsType = {
  coord: Coord;
  isCaptured: boolean;
  capturedBy: Player | null;
  sidesSelected: number;
  index: number;
  onclick: (coord: Coord) => void;
  sideClick: () => void;
};

export function SquareView(props: SquarePropsType) {
  const { index, coord, isCaptured, capturedBy, sidesSelected, onclick, sideClick } = props;
  const squareRef = useRef<HTMLDivElement>(null);

  const [displayText, setDisplayText] = useState<number | string>(0);

  const style = {
    gridColumnStart: coord[0] + 2,
    gridRowStart: coord[1] + 2,
    zIndex: 10,
    backgroundColor: isCaptured ? "cadetblue" : "",
  };

  useEffect(() => {
    setDisplayText(sidesSelected);
  }, [sidesSelected]);

  console.log(sidesSelected);

  return (
    <div
      className={`square ${isCaptured && "captured"}`}
      ref={squareRef}
      style={style}
      onClick={() => onclick(coord)}
    >
      {displayText}
    </div>
  );
}
