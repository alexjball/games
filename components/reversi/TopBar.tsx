import classNames from "classnames"
import NextLink from "next/link"
import styles from "./reversi.module.css"

export default function TopBar() {
  return (
    <div className={styles["top-bar"]}>
      <Logo />
      <div className={styles["top-link-container"]}>
        <Link href="https://en.wikipedia.org/wiki/Reversi#Rules">
          HOW TO PLAY
        </Link>
        <Link href="https://github.com/alexjball/reversi">ABOUT</Link>
        <NextLink href="/">
          <a className={classNames(styles.link, styles.springy)}>MORE GAMES</a>
        </NextLink>
      </div>
    </div>
  )
}

const Link = ({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) => (
  <a
    className={classNames(styles.link, styles.springy)}
    target="_blank"
    href={href}
    rel="noreferrer"
  >
    {children}
  </a>
)

function Logo() {
  return (
    <div className={styles["logo"]}>
      RE<span>VER</span>SI
    </div>
  )
}
