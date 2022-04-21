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
        <Link href="/reversi">
          <a>
            <h2>Reversi</h2>
          </a>
        </Link>
      </div>
    </>
  )
}
