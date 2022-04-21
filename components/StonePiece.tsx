import { Stone } from "../game/reversi"

export default function StonePiece(props: { stone: Stone }) {
  const { stone } = props

  return (
    <div className="stone-wrapper">
      <div className={`stone ${stone}`}></div>
      <div className="stone-highlight"></div>
    </div>
  )
}
