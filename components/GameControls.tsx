import React, { useCallback, useEffect, useRef, useState } from "react";
import { GameState } from "../game/reversi";
import StonePiece from "./StonePiece";

export interface ControlPanelProps {
  gamestate: GameState;
  setShouldShowLastMove: any;
  setShouldShowValidMoves: any;
  side?: number;
  newGame: () => void;
  pass: () => void;
}

export function ControlPanel(props: ControlPanelProps) {
  const {
    gamestate,
    setShouldShowLastMove,
    setShouldShowValidMoves,
    side,
    newGame,
    pass,
  } = props;

  const style: React.CSSProperties = {
    backgroundColor: "aliceblue",
    height: "100vh",
    padding: "1em",
    margin: "auto",
    float: "left",
  };

  return (
    <div style={style}>
      <NewGame gamestate={gamestate} newGame={newGame} />
      <Control title="show available moves" onclick={setShouldShowValidMoves} />
      <Control title="show last move" onclick={setShouldShowLastMove} />
      <Control title="pass" onclick={pass} />
      <ScoreDisplay gamestate={gamestate} />
    </div>
  );
}

function NewGame(props: { gamestate: GameState; newGame: () => void }) {
  const newGame = useCallback(() => {
    if (
      props.gamestate.lastMove &&
      window.confirm("Are you sure you want to end the current game?")
    ) {
      props.newGame();
    }
  }, [props]);
  return <Control title="new game" onclick={newGame} />;
}

export function Control(props: {
  title: string;
  onclick: () => void;
  style?: object;
}) {
  const { title, onclick, style } = props;

  const controlStyle: React.CSSProperties = {
    ...style,
    height: "4em",
    margin: "5px auto",
    width: "100%",
    textAlign: "center",
  };
  return (
    <button type="button" onClick={onclick} style={controlStyle}>
      {title}
    </button>
  );
}

export function ScoreDisplay(props: { gamestate: GameState }) {
  const { blackScore, whiteScore } = props.gamestate;
  const ref = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  const style: React.CSSProperties = {
    height: "5em",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
    margin: "1em",
    lineHeight: "1.8em",
    textAlign: "center",
  };

  const { currentStone } = props.gamestate;

  useEffect(() => {
    if (!ref.current) return;

    setWrapperWidth(ref.current.getBoundingClientRect().width);
  });

  return (
    <>
      <div style={style} ref={ref}>
        <div
          style={{
            width: wrapperWidth * 0.4,
            height: wrapperWidth * 0.4,
            margin: "3em auto",
          }}
        >
          <StonePiece stone={currentStone} />
        </div>
        <div>
          <strong>Scores:</strong>
        </div>
        <div>Black: {blackScore}</div>
        <div>White: {whiteScore}</div>
      </div>
    </>
  );
}
