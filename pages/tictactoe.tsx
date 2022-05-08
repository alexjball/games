import Head from "next/head"
import { Game } from "../components/tictactoe"

export default function TicTacToe() {
  return (
    <>
      <Head>
        <title>TicTacToe</title>
      </Head>
      <Game />
    </>
  )
}
