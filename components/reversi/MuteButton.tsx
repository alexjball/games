import classNames from "classnames"
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"
import styles from "./reversi.module.css"

interface Props {
  muted?: boolean
  onClick?: () => void
}

export default function MuteButton({ muted, onClick }: Props) {
  const Icon = muted ? IoVolumeMuteOutline : IoVolumeHighOutline
  return (
    <button
      className={classNames(styles["mute-button"], styles.springy)}
      onClick={onClick}
    >
      <Icon style={{ marginRight: "0.5em" }} /> FARTS
    </button>
  )
}
