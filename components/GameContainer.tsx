import React, { useCallback } from "react";
import GameTable from "./GameTable";
import GameAudio from "./GameAudio";
import ConfirmClose from "./ConfirmClose";
import { move, newGame, pass, useGame } from "../redux/game";
import { toggleMute, useAudio } from "../redux/audio";
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

  const muteCallback = useCallback(() => dispatch(toggleMute()), [dispatch]);

  return (
    <div>
      <ConfirmClose gameState={game} />
      <GameTable
        gamestate={game}
        onNewGame={onNewGame}
        onMove={onMove}
        onPass={onPass}
        muted={muted}
        toggleMute={muteCallback}
      />
      <GameAudio gameState={game} muted={muted} />
    </div>
  );
}
