import { GameState, Stone } from "../game/reversi";
import Board from "./Board";
import useResizeObserver from "use-resize-observer";
import React, { useEffect, useRef, useState } from "react";
import StonePiece from "./StonePiece";
import { ControlPanel } from "./GameControls";

interface GameTableProps {
  gamestate: GameState;
  onMove: (r: number, c: number) => void;
  onNewGame: () => void;
  onPass: () => void;
}

export default function GameTable(props: GameTableProps) {
  const ref = useRef(null);
  const dimensions = useResizeObserver({ ref });
  const [side, setSide] = useState<number>(10);

  const { gamestate, onMove, onNewGame, onPass } = props;

  const [shouldShowLastMove, setShouldShowLastMove] = useState<boolean>(false);
  const [shouldShowValidMoves, setShouldShowValidMoves] = useState<boolean>(
    false
  );

  useEffect(() => {
    console.log(dimensions);
    if (dimensions.width) {
      setSide(innerHeight);
    }
  }, [dimensions]);

  const toggleLastMove = () => {
    setShouldShowLastMove((prev) => !prev);
  };

  const toggleValidMoves = () => {
    setShouldShowValidMoves((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <ControlPanel
        gamestate={gamestate}
        setShouldShowLastMove={toggleLastMove}
        setShouldShowValidMoves={toggleValidMoves}
        side={side}
        newGame={onNewGame}
        pass={onPass}
      />
      <Board
        gamestate={gamestate}
        side={side ?? 0}
        shouldShowLastMove={shouldShowLastMove}
        shouldShowValidMoves={shouldShowValidMoves}
        onMove={onMove}
      />
    </div>
  );
}
