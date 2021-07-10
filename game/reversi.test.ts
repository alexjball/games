import { Board, Reversi, Stone, Location } from "./reversi";

describe("Board", () => {
  it("visits each square", () => {
    let b = new Board(),
      count = 0;
    b.forEachSquare((r, c, s) => {
      expect(s).toEqual("empty");
      count++;
    });
    expect(count).toEqual(b.size * b.size);
  });

  it("visits each interior neighbor", () => {
    let b = new Board(),
      count = 0;
    b.forEachNeighbor(3, 3, (r, c, s) => {
      expect(s).toEqual("empty");
      count++;
    });
    expect(count).toEqual(8);
  });

  it("handles edges", () => {
    let b = new Board(),
      count = 0;
    b.forEachNeighbor(0, 7, (r, c, s) => {
      expect(s).toEqual("empty");
      count++;
    });
    expect(count).toEqual(3);
  });

  it("looks up squares", () => {
    let b = new Board();
    b.squares[1][1] = "black";

    expect(b.lookup(1, 1)).toEqual("black");
    expect(b.lookup(0, 0)).toEqual("empty");
    expect(b.lookup(-1, 0)).toBeUndefined();
  });

  it("computes flipped stones", () => {
    let b = new Board();

    b.squares[1][1] = "black";
    b.squares[2][1] = "black";
    b.squares[3][1] = "white";

    expect(b.getFlipsInDirection("white", 0, 1, 1, 0)).toEqual([
      [1, 1],
      [2, 1],
    ]);
    expect(b.getFlipsInDirection("white", 4, 1, 1, 0)).toEqual([]);
    expect(b.getFlipsInDirection("white", 4, 1, -1, 0)).toEqual([]);
  });

  it("correctly identifies valid moves", () => {
    let b = new Board();

    b.squares[1][1] = "black";
    b.squares[2][1] = "black";
    b.squares[3][1] = "white";

    expect(b.isValidMove("black", 1, 1)).toBeFalsy();
    expect(b.isValidMove("black", 0, 1)).toBeFalsy();
    expect(b.isValidMove("black", 2, 0)).toBeFalsy();
    expect(b.isValidMove("black", 4, 1)).toBeTruthy();
    expect(b.isValidMove("white", 5, 5)).toBeFalsy();
    expect(b.isValidMove("white", 0, 1)).toBeTruthy();
  });

  it("updates squares on move", () => {
    let b = new Board();

    b.squares[1][1] = "black";
    b.squares[2][1] = "black";
    b.squares[3][1] = "white";

    b.move("black", 4, 1);
    [
      [2, 1],
      [3, 1],
      [4, 1],
    ].forEach(([r, c]) => expect(b.squares[r][c]).toEqual("black"));

    expect(() => b.move("black", 0, 1)).toThrow();
  });
});

describe("Reversi", () => {
  let r: Reversi;
  beforeEach(() => (r = new Reversi()));

  it("can be constructed", () => {
    expect(r).toBeInstanceOf(Reversi);
    expect(r.state).toEqual("empty");
  });

  it("can start a game", () => {
    r.newGame("black");
    expect(r.state).toEqual("in-progress");
    expect(r.blackScore).toEqual(2);
    expect(r.whiteScore).toEqual(2);
    expect(r.currentStone).toEqual("black");
  });

  it("computes valid moves for new game", () => {
    r.newGame("black");

    expect(r.board.isValidMove("black", 5, 3)).toBeTruthy();
    expect(r.board.isValidMove("black", 2, 3)).toBeFalsy();

    expect(r.validMoves).toHaveLength(4);
    [
      [4, 2],
      [5, 3],
      [2, 4],
      [3, 5],
    ].forEach((location) => {
      expect(r.validMoves).toContainEqual(location);
    });
  });

  it("processes moves for the current player", () => {
    r.newGame("black");

    r.move(3, 5);
    expect(r.currentStone).toEqual("white");
    expectStone(r.board, "black", [
      [3, 3],
      [3, 4],
      [3, 5],
    ]);

    r.move(2, 5);
    expect(r.currentStone).toEqual("black");
    expectStone(r.board, "white", [
      [4, 3],
      [3, 4],
      [2, 5],
    ]);

    expect(r.state).toEqual("in-progress");
  });

  it("allows passing", () => {
    r.newGame("black");
    r.pass();
    expect(r.currentStone).toEqual("white");
  });

  it("throws on invalid moves", () => {
    r.newGame("black");

    expect(() => r.move(3, 4)).toThrow();
    expect(() => r.move(0, 0)).toThrow();
  });

  it("identifies win conditions", () => {
    r.newGame("black");
    r.board.forEachSquare((row, c) => {
      r.board.squares[row][c] = "black";
    });
    r.updateScore();
    expect(r.state).toEqual("winner-black");

    r.newGame("black");
    r.board.forEachSquare((row, c) => {
      r.board.squares[row][c] = "white";
    });
    r.updateScore();
    expect(r.state).toEqual("winner-white");

    r.newGame("black");
    r.board.forEachSquare((row, c) => {
      r.board.squares[row][c] = row % 2 ? "black" : "white";
    });
    r.updateScore();
    expect(r.state).toEqual("tie");
  });

  it("eventually ends", () => {
    r.newGame("black");
    while (r.state === "in-progress") {
      if (r.validMoves.length) {
        r.move(r.validMoves[0][0], r.validMoves[0][1]);
      } else {
        r.pass();
      }
    }
    expect(r.state).not.toEqual("in-progress");
  });

  it("prints the board", () => {
    r.newGame("black");
    expect(r.toString()).toBeDefined();
  });
});

function expectStone(b: Board, s: Stone, locations: Location[]) {
  locations.forEach(([r, c]) => expect(b.squares[r][c]).toEqual(s));
}
