import dynamic from "next/dynamic"
import { createStore } from "../redux"
import { Provider } from "react-redux"
import TopBar from "../components/TopBar"
import Head from "next/head"
const GameContainer = dynamic(() => import("../components/GameContainer"), {
  ssr: false,
})

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
