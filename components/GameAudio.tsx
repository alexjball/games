import { Component, createRef, RefObject } from "react"
import { GameState, Move } from "../game/reversi"
import MuteButton from "./MuteButton"

const SOUNDS = {
  burp1: "/Burp 1.wav",
  fart1: "/Fart 1.wav",
  fart2: "/Fart 2.wav",
  fart3: "/Fart 3.wav",
  fart4: "/Fart 4.wav",
  fart5: "/Fart 5.wav",
  fart6: "/Fart 6.wav",
  fart7: "/Fart 7.wav",
  fart8: "/Fart 8.wav",
  fart9: "/Fart 9.wav",
  fart10: "/Fart 10.wav",
}
type Sound = keyof typeof SOUNDS

type Props = { gameState: GameState; muted: boolean }

export default class GameAudio extends Component<Props, {}> {
  sounds: RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props)
    this.sounds = createRef()
  }

  componentDidUpdate({ gameState: { lastMove: prev } }: Props) {
    const curr = this.props.gameState.lastMove

    if (this.didMove(prev, curr)) {
      this.playMove()
    }
  }

  didMove(prev?: Move, curr?: Move) {
    if (curr && curr.length) {
      if (prev && prev.length) {
        return curr[0].s !== prev[0].s
      } else {
        return true
      }
    } else {
      return false
    }
  }

  playMove() {
    const options = Object.keys(SOUNDS)
    const i = Math.floor(Math.random() * options.length)
    this.play(options[i] as Sound)
  }

  play(id: Sound) {
    if (this.props.muted) {
      return
    }

    const sound = this.sounds.current?.querySelector(
      `#${id}`,
    ) as HTMLAudioElement
    if (sound) {
      sound.currentTime = 0
      sound.play()
    }
  }

  render() {
    return (
      <div ref={this.sounds} style={{ display: "none" }}>
        {Object.entries(SOUNDS).map(([id, src], i) => (
          <audio key={i} id={id} src={src} />
        ))}
      </div>
    )
  }
}
