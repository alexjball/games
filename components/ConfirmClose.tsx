import { useEffect, useRef } from "react"
import { GameState } from "../game/reversi"

interface Props {
  gameState: GameState
}

export default function ConfirmClose({ gameState: { lastMove } }: Props) {
  useEffect(() => {
    if (lastMove) {
      const listener = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ""
      }
      window.addEventListener("beforeunload", listener)
      return () => window.removeEventListener("beforeunload", listener)
    }
  }, [lastMove])
  return null
}
