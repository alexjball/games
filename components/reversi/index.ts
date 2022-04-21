import dynamic from "next/dynamic"

export { default as TopBar } from "./TopBar"
export const GameContainer = dynamic(() => import("./GameContainer"), {
  ssr: false,
})
