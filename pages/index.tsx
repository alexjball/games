import dynamic from "next/dynamic";

const GameContainer = dynamic(() => import("../components/GameContainer"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <GameContainer />
    </div>
  );
}
