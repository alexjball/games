import React, { useCallback } from "react";
import { useReversi } from "../game/duck";
import GameTable from "./GameTable";
import GameAudio from "./GameAudio";

export default function GameContainer() {
  const [gameState, dispatch] = useReversi();

  const onNewGame = useCallback(() => dispatch({ type: "newGame" }), [
    dispatch,
  ]);

  const onMove = useCallback(
    (r: number, c: number) => dispatch({ type: "move", r, c }),
    [dispatch]
  );

  const onPass = useCallback(() => dispatch({ type: "pass" }), [dispatch]);

  return (
    <div>
      <GameAudio gameState={gameState} />
      <GameTable
        gamestate={gameState}
        onNewGame={onNewGame}
        onMove={onMove}
        onPass={onPass}
      />
    </div>
  );
}
