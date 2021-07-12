import React from "react";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Logo />
      <div className="top-link-container">
        <Link href="https://en.wikipedia.org/wiki/Reversi#Rules">
          HOW TO PLAY
        </Link>
        <Link href="https://github.com/alexjball/reversi">ABOUT</Link>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          MORE GAMES
        </Link>
      </div>
    </div>
  );
}

const Link: React.FC<{ href: string }> = ({ href, children }) => (
  <a className="link springy" target="_blank" href={href} rel="noreferrer">
    {children}
  </a>
);

function Logo() {
  return (
    <div className="logo">
      RE<span>VER</span>SI
    </div>
  );
}
