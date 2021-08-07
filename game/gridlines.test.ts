import { Gridlines, Square } from "./gridlines";

describe("game of gridlines", () => {
  const game = new Gridlines(15);
/* 
  it("game creats a board", () => {
    const game = new Gridlines(15);
    const gridSquares: SquareState[][] = [];
    for (let i = 0; i < 15; i++) {
      const row: SquareState[] = [];
      for (let k = 0; k < 15; k++) {
        const square: SquareState = {
          coord: [i, k],
          clickedSides: [false, false, false, false],
          isCaptured: false,
          capturedBy: null,
        };
        row.push(square);
      }
      gridSquares.push(row);
    }

    expect(game.board.grid).toStrictEqual(gridSquares);
  });


  it("updates square", () => {

    game.clicked([4, 5], 0);

    expect(game.board.grid[4][5].clickedSides).toStrictEqual([true,false, false, false]);
    game.clicked([4, 5], 2);
    
    expect(game.board.grid[4][5].clickedSides).toStrictEqual([true, false, true, false]);
  });


  it("captures square", () => {
    game.clicked([4, 5], 1);
    game.clicked([4, 5], 3);
    game.captured([4, 5])

    expect(game.board.grid[4][5].isCaptured).toBeTruthy
    expect(game.board.grid[4][5].capturedBy).toBe(1)

});
 */

  it("changes turn", () => {
    game.setTurn(2)
    expect(game.gameState.turn).toEqual(2)
  })

  it("counts score", () => {

    const square = game.grid[3][2] as Square
    square.sidesSelected = 4
    
    expect(game.gameState.player1Score).toEqual(1)
  })

});
