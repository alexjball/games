import Head from "next/head"
import { Provider } from "react-redux"
import { GameContainer, TopBar } from "../components/reversi"
import { createStore } from "../lib/reversi"

export default function Reversi() {
  return (
    <>
      <Head>
        <title>Reversi</title>
      </Head>
      <Provider store={createStore()}>
        <TopBar />
        <GameContainer />
      </Provider>
    </>
  )
}
