import { move } from "../redux/game";
import { Block, Corner, Edge, Square } from "../Types/gridlinesTypes";
import { Gridlines } from "./gridlines";

describe("game of gridlines", () => {
  let game = new Gridlines(15);
  beforeEach(() => {
    game = new Gridlines(15);
  });

  it("game creats a board", () => {
    const game = new Gridlines(15);
    const gridSquares: (Square | Edge | Corner)[][] = [];
    for (let r = 0; r < 15; r++) {
      const row: Square[] = [];
      for (let c = 0; c < 15; c++) {
        const square: Square = {
          blockType: "square",
          coord: [c, r],
          isCaptured: false,
          capturedBy: null,
          sidesSelected: 0,
        };
        row.push(square);
      }
      gridSquares.push(row);
    }

    const blockTypesGameBoard = game.board.map((row) => row.map((block) => block.blockType));
    const blockTypesMockUp = game.board.map((row) => row.map((block) => block.blockType));

    expect(blockTypesGameBoard).toStrictEqual(blockTypesMockUp);

    const coordsGameBoard = game.board.map((row) => row.map((block) => block.coord));

    const coordsMockUp = game.board.map((row) => row.map((block) => block.coord));

    expect(coordsGameBoard).toStrictEqual(coordsMockUp);

    expect(
      game.board.every((row) =>
        row.every((block) => block.blockType !== "square" || !block.isCaptured)
      )
    );
  });
  it("updates turn", () => {
    game.turn = game.updateTurn();
    expect(game.turn).toEqual(2);
    game.turn = game.updateTurn();
    expect(game.turn).toEqual(1);
  });

  it("counts score", () => {
    game.updateScore(1);
    expect(game.player1Score).toEqual(1);
    game.updateScore(1);
    expect(game.player1Score).toEqual(2);
  });

  it("captures square", () => {
    const square = game.getSquare([7, 9]);
    expect(square).toStrictEqual({
      blockType: "square",
      coord: [7, 9],
      isCaptured: false,
      capturedBy: null,
      sidesSelected: 0,
    });
    const capturedSquare = game.captureSquare(square);
    expect(capturedSquare).toStrictEqual({
      blockType: "square",
      coord: [7, 9],
      isCaptured: true,
      capturedBy: 1,
      sidesSelected: 0,
    });
  });

  it("can check for block types", () => {
    const blockTypeTest: Square = game.getSquare([7, 9]);
    expect(game.isSquare(blockTypeTest)).toBeTruthy();
    expect(game.isEdge(blockTypeTest)).toBeFalsy();
  });

  it("can grab square block", () => {
    const sqTest = game.getSquare([3, 5]);
    expect(game.isSquare(sqTest)).toBeTruthy();
    const notSqTest = game.getEdge([3, 4]) as Edge;
    console.log(notSqTest.blockType);
    expect(game.isSquare(notSqTest)).toBeFalsy();
  });

  it("square sidesSelected incs when neighbor edge is clicked", () => {
    const edge = game.getEdge([6, 7]);
    const sq = game.getSquare([5, 7]);
    game.move(edge);

    expect(sq.sidesSelected).toEqual(1)
  });
});
