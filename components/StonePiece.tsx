import { Stone } from "../game/reversi";

export default function StonePiece(props: { stone: Stone }) {
  const { stone } = props;

  const style: React.CSSProperties = {
    height: "90%",
    width: "90%",
    backgroundColor: stone === "white" ? "#ddd" : "black",
    borderRadius: "50%",
    margin: "auto",
    boxShadow: "4px 4px 10px #4456",
  };

  const highlightStyle: React.CSSProperties = {
    position: "absolute",
    height: "12%",
    width: "12%",
    backgroundColor: stone === "white" ? "#fff8" : "#5559",
    borderRadius: "50%",
    left: "25%",
    top: "20%",
  };

  const wrapperStyle: React.CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
  };

  return (
    <div style={wrapperStyle}>
      <div className="stone" style={style}></div>
      <div className="stone-highlight" style={highlightStyle}></div>
    </div>
  );
}
