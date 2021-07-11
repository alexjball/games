import dynamic from "next/dynamic";
import { createStore } from "../redux";
import { Provider } from "react-redux";
import TopBar from "../components/TopBar";

const GameContainer = dynamic(() => import("../components/GameContainer"), {
  ssr: false,
});

export default function Reversi() {
  return (
    <Provider store={createStore()}>
      <TopBar />
      <GameContainer />
    </Provider>
  );
}
