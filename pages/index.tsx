import Head from "next/head"
import Link from "next/link"
import styles from "./index.module.css"

export default function Home() {
  return (
    <>
      <Head>
        <title>Casual Games</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Some Casual Games</h1>
        <GameLink href="/reversi" label="Reversi" />
        <GameLink href="/tictactoe" label="TicTacToe" />
      </div>
    </>
  )
}

const GameLink: React.FC<{ label: string; href: string }> = ({
  label,
  href,
}) => (
  <Link href={href}>
    <a>
      <h2>{label}</h2>
    </a>
  </Link>
)
