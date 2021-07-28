import { Board, Chess, Location } from "./chess";
import { Piece } from "./pieces";

describe("chess", () => {
  it("starts a new game", () => {
    const g = new Chess();
    g.newGame();
    const s = g.board.squares[0][0] as Piece;
    expect(s.type).toBe("Rook");
    expect(g.blackScore).toEqual(0);
    expect(g.state).toBe("empty");
  });
});
