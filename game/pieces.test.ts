import ChessPiece from "../components/ChessPiece"
import { Piece } from "./pieces"

describe("Piece", ()=> {
    it("can be constructed", () => {
        const p = new Piece("teamBlack", "Pawn", [0, 1])
    })

    it ("can move to new square", () => {
        const p = new Piece("teamBlack", "Pawn", [0, 1])
        console.log(p.currentSquare)
        p.moveTo([1, 1])
        expect(p.currentSquare).toStrictEqual([1, 1])
    })	

}) 