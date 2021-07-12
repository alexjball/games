import React, { useEffect, useRef, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { GameState } from "../game/reversi";
import Board from "./Board";
import { ControlPanel } from "./GameControls";

interface GameTableProps {
  gamestate: GameState;
  onMove: (r: number, c: number) => void;
  onNewGame: () => void;
  onPass: () => void;
  muted: boolean;
  toggleMute: () => void;
}

export default function GameTable(props: GameTableProps) {
  const ref = useRef(null);
  const dimensions = useResizeObserver({ ref });
  const [side, setSide] = useState<number | undefined>();

  const { gamestate, onMove, onNewGame, onPass, muted, toggleMute } = props;
  const { state } = gamestate;
  const [shouldShowLastMove, setShouldShowLastMove] = useState<boolean>(false);
  const [shouldShowValidMoves, setShouldShowValidMoves] = useState<boolean>(
    false
  );

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const minDimension = dimensions
        ? Math.min(dimensions.width, dimensions.height)
        : 0;
      const inset = minDimension * 0.9;
      setSide(inset);
    }
  }, [dimensions]);

  const toggleLastMove = () => {
    setShouldShowLastMove((prev) => !prev);
  };

  const toggleValidMoves = () => {
    setShouldShowValidMoves((prev) => !prev);
  };

  return (
    <div className="game-table" ref={ref}>
      <div className="spacer"></div>
      <ControlPanel
        gamestate={gamestate}
        setShouldShowLastMove={toggleLastMove}
        setShouldShowValidMoves={toggleValidMoves}
        shouldShowLastMove={shouldShowLastMove}
        shouldShowValidMoves={shouldShowValidMoves}
        side={side}
        newGame={onNewGame}
        pass={onPass}
        muted={muted}
        toggleMute={toggleMute}
      />
      {/* {state === "winner-white" || ("winner-black" && <div>{state}</div>)} */}
      <div
        className="board-wrapper" /*  style={{ height: side, width: side }} */
      >
        <Board
          gamestate={gamestate}
          side={side ?? 0}
          shouldShowLastMove={shouldShowLastMove}
          shouldShowValidMoves={shouldShowValidMoves}
          onMove={onMove}
        />
      </div>
      <div className="spacer"></div>
    </div>
  );
}
