import { PieceType } from "../game/pieces";

export default function ChessPiece(props: { piecetype: PieceType }) {
  const { piecetype } = props;

  return (
    <div className='piece-wrapper' onClick={() => console.log(piecetype)}>
      <div className={`piece ${piecetype}`}>{piecetype}</div>
      <div className='piece-highlight'></div>
    </div>
  );
}
