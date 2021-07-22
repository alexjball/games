import { Board, Chess, Location } from "./chess";
import { Piece } from "./pieces";

describe("chess", () => {
  const testgame = new Chess();
  testgame.newGame();
  testgame.board.printBoard();
  it("has a test", () => expect(true).toBeTruthy());
});
