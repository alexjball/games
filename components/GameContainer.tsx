import React, { useCallback } from "react";
import GameTable from "./GameTable";
import GameAudio from "./GameAudio";
import ConfirmClose from "./ConfirmClose";
import { move, newGame, pass, useGame } from "../redux/game";
import { useAudio } from "../redux/audio";
import { useDispatch } from "react-redux";

export default function GameContainer() {
  const game = useGame();
  const { muted } = useAudio();
  const dispatch = useDispatch();

  const onNewGame = useCallback(() => dispatch(newGame()), [dispatch]);

  const onMove = useCallback(
    (r: number, c: number) => dispatch(move({ r, c })),
    [dispatch]
  );

  const onPass = useCallback(() => dispatch(pass()), [dispatch]);

  return (
    <div>
      <ConfirmClose gameState={game} />
      <GameAudio gameState={game} muted={muted} />
      <GameTable
        gamestate={game}
        onNewGame={onNewGame}
        onMove={onMove}
        onPass={onPass}
      />
    </div>
  );
}
