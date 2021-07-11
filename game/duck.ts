import { useReducer, useState } from "react";
import { GameState, otherStone, Reversi, Stone } from "./reversi";

export type Action = Move | Pass | NewGame;

type Move = {
  type: "move";
  r: number;
  c: number;
};

type Pass = {
  type: "pass";
};

type NewGame = {
  type: "newGame";
};

class Duck {
  startingStone: Stone = "black";
  game = new Reversi();

  public get state(): GameState {
    return this.game.toJSON();
  }

  newGame() {
    this.game.newGame(this.startingStone);
    this.startingStone = otherStone(this.startingStone);
  }

  pass() {
    this.game.pass();
  }

  move(r: number, c: number) {
    if (this.game.isValidMove(r, c)) {
      this.game.move(r, c);
    }
  }

  reducer = (_: GameState, action: Action): GameState => {
    switch (action.type) {
      case "move":
        this.move(action.r, action.c);
        break;
      case "pass":
        this.pass();
        break;
      case "newGame":
        this.newGame();
        break;
    }
    return this.state;
  };
}

export function useReversi() {
  const [duck] = useState(() => {
    const d = new Duck();
    d.newGame();
    return d;
  });
  return useReducer(duck.reducer, duck.state);
}
