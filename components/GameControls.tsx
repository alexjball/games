import React, { useCallback, useEffect, useRef, useState } from "react";
import { GameState, otherStone } from "../game/reversi";
import MuteButton from "./MuteButton";
import StonePiece from "./StonePiece";

export interface ControlPanelProps {
  gamestate: GameState;
  setShouldShowLastMove: any;
  setShouldShowValidMoves: any;
  shouldShowLastMove: boolean;
  shouldShowValidMoves: boolean;
  side?: number;
  newGame: () => void;
  pass: () => void;
  muted: boolean;
  toggleMute: () => void;
}

export function ControlPanel(props: ControlPanelProps) {
  const {
    gamestate,
    setShouldShowLastMove,
    setShouldShowValidMoves,
    shouldShowLastMove,
    shouldShowValidMoves,
    newGame,
    pass,
    muted,
    toggleMute,
  } = props;

  return (
    <div className="side-panel">
      <div className="control-panel">
        <NewGame gamestate={gamestate} newGame={newGame} />
        <Control
          title={`${shouldShowValidMoves ? "hide" : "show"} legal moves`}
          onclick={setShouldShowValidMoves}
        />
        <Control
          title={`${shouldShowLastMove ? "hide" : "show"} last move`}
          onclick={setShouldShowLastMove}
        />
        <Control
          title="pass"
          onclick={() => {
            if (gamestate.state === "in-progress") {
              pass();
            }
          }}
        />
      </div>
      <div className="side-info">
        <Status gamestate={gamestate} />
        <ScoreDisplay gamestate={gamestate} />
        <MuteButton muted={muted} onClick={toggleMute} />
      </div>
    </div>
  );
}

function Status({ gamestate }: { gamestate: GameState }) {
  return (
    <div className="status">
      {(() => {
        switch (gamestate.state) {
          case "tie":
            return "TIE";
          case "winner-black":
            return "BLACK WINS!";
          case "winner-white":
            return "WHITE WINS!";
          case "in-progress":
            if (gamestate.lastMove) {
              const lastStone = otherStone(
                gamestate.currentStone
              ).toUpperCase();
              const [placed] = gamestate.lastMove;
              if (placed) {
                const col = ["A", "B", "C", "D", "E", "F", "G", "H"][placed.c];
                const row = 8 - placed.r;
                return `${lastStone} TO ${col}${row}`;
              }
              return `${lastStone} PASSED`;
            }
          default:
            return `${gamestate.currentStone.toUpperCase()}'S TURN`;
        }
      })()}
    </div>
  );
}

export function NewGame(props: { gamestate: GameState; newGame: () => void }) {
  const newGame = useCallback(() => {
    const shouldPrompt =
      props.gamestate.lastMove && props.gamestate.state === "in-progress";
    if (
      !shouldPrompt ||
      window.confirm("Are you sure you want to end the current game?")
    ) {
      props.newGame();
    }
  }, [props]);
  return <Control title="new game" onclick={newGame} />;
}

export function Control(props: { title: string; onclick: () => void }) {
  const { title, onclick } = props;

  return (
    <button className="control springy" type="button" onClick={onclick}>
      <div className="control-text">{title}</div>
    </button>
  );
}

export function ScoreDisplay(props: { gamestate: GameState }) {
  const { blackScore, whiteScore } = props.gamestate;
  const ref = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  const { currentStone } = props.gamestate;

  useEffect(() => {
    if (!ref.current) return;
    setWrapperWidth(ref.current.getBoundingClientRect().width);
  });

  return (
    <>
      <div className="score-display-container" ref={ref}>
        <div
          className={`score-item control-text black ${
            currentStone == "black" ? "turn" : ""
          }`}
        >
          <div className="score-item-icon"> </div>
          <div>Black: {blackScore}</div>
        </div>
        <div
          className={`score-item control-text white ${
            currentStone == "white" ? "turn" : ""
          }`}
        >
          <div className="score-item-icon"> </div>
          <div>White: {whiteScore}</div>
        </div>
      </div>
    </>
  );
}
