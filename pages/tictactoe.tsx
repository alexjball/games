import Head from "next/head"
import { Game } from "../components/tictactoe"

export default function Reversi() {
  return (
    <>
      <Head>
        <title>TicTacToe</title>
      </Head>
      <Game />
    </>
  )
}
