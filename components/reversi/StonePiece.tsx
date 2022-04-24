import classNames from "classnames"
import { Stone } from "../../lib/reversi"
import styles from "./reversi.module.css"

export default function StonePiece(props: { stone: Stone }) {
  const { stone } = props

  return (
    <div className={styles["stone-wrapper"]}>
      <div className={classNames(styles.stone, styles[stone])}></div>
      <div className={styles["stone-highlight"]}></div>
    </div>
  )
}
