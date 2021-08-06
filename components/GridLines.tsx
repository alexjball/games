import React, { useEffect, useRef, useState } from "react";
import { Coord } from "../game/chess2";
import { Block, Corner, Edge, GameState, Gridlines, Player, Square } from "../game/gridlines";
import "../styles/globals.css";
import "../styles/gridlines.css";

export default function GridlinesView(props: { size: number }) {
  const { size } = props;
  const gridlines: Gridlines = new Gridlines(size);
  const [game, setGame] = useState<GameState>(gridlines.gameState);
  const rerender = () => setGame({ ...game });
  const [hoveredEdge, setHoveredEdge] = useState<[number, number]>([0, 0]);

  const getBlock = (coord: Coord): Square | Edge | Corner => {
    const [x, y] = coord;
    return game.board[x][y];
  };

  const clicked = () => {
    const block: Block = getBlock(hoveredEdge);
    if (block.blockType === "edge") {
      if (block.isSelected) return;
      console.log("edge", hoveredEdge);
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

  const reportPosition = (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => {
    const target = event.target as HTMLElement;
    const horiz = event.clientX - target.offsetLeft;
    const vert = event.clientY - target.offsetTop;
    const width = target.offsetWidth;
    const height = target.offsetHeight;

    const x = horiz > (3 * width) / 4 ? 1 : horiz < width / 4 ? -1 : 0;
    const y = vert > (3 * height) / 4 ? 1 : vert < height / 4 ? -1 : 0;

    const [k, i] = coord;
    const [hx, hy] = hoveredEdge;

    if (k + x !== hx) {
      setHoveredEdge([k + x, i]);
      rerender();
    } else if (i + y !== hy) {
      setHoveredEdge([k, i + y]);
      rerender();
    }
  };

  return (
    <BoardView
      grid={game.board}
      gameState={game}
      clicked={clicked}
      reportPosition={reportPosition}
      hoveredEdge={hoveredEdge}
    />
  );
}

export type BoardPropsType = {
  grid: (Square | Edge | Corner)[][];
  gameState: GameState;
  clicked: () => void;
  reportPosition: (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => void;
  hoveredEdge: Coord;
};

export function BoardView(props: BoardPropsType) {
  const { grid, gameState, clicked, reportPosition, hoveredEdge } = props;

  return (
    <div id='gridlines' className='board-grid'>
      {grid.map((row, k) =>
        row.map((blk, i) => {
          if (blk.blockType === "square") {
            const {sidesSelected, isCaptured, capturedBy } = blk;
            return (
              <SquareView
                key={k + "" + i}
                coord={[k, i]}
                onclick={clicked}
                index={i}
                sidesSelected={sidesSelected}
                isCaptured={isCaptured}
                capturedBy={capturedBy}
                reportPosition={reportPosition}
              />
            );
          } else if (blk.blockType === "edge") {
            const { isSelected } = blk;
            const [x, y] = hoveredEdge;
            return (
              <EdgeView
                key={k + "" + i}
                isSelected={isSelected}
                hovered={x === k && y === i}
                onclick={clicked}
                coord={[k, i]}
              />
            );
          } else if (blk.blockType === "corner") {
            return <CornerView key={k + "" + i} coord={[k, i]} />;
          }
        })
      )}
    </div>
  );
}

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
      className={`edge ${isSelected? "selected" : ""} ${hovered ? "incoming" : ""}`}
      style={style}
      onClick={() => {
        onclick(coord);
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
  onclick: () => void;
  reportPosition: (event: React.MouseEvent<HTMLElement, MouseEvent>, coord: Coord) => void;
};

export function SquareView(props: SquarePropsType) {
  const { index, coord, isCaptured, capturedBy, sidesSelected, onclick, reportPosition } = props;
  const squareRef = useRef<HTMLDivElement>(null);

  const [displayText, setDisplayText] = useState<number | string>("");

  const style = {
    gridColumnStart: coord[0] + 2,
    gridRowStart: coord[1] + 2,
    zIndex: 10,
    backgroundColor: isCaptured ? "var(--board-color)" : "",
    opacity: "0.2",
  };

  useEffect(() => {
    capturedBy && setDisplayText(capturedBy);
  }, [capturedBy]);

  return (
    <div
      className={`square`}
      ref={squareRef}
      style={style}
      onClick={() => onclick()}
      onMouseMove={(event) => reportPosition(event, coord)}
    >
      <div>{displayText}</div>
    </div>
  );
}

export function CornerView(props: { coord: Coord }) {
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
