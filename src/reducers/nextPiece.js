import { PIECE_COUNT } from '../components/Piece';

function nextPiece(state) {
  // TODO: more/different randomiser systems
  const nextPiece = Math.floor(Math.random() * PIECE_COUNT);

  return {
    ...state,
    currentPiece: nextPiece,
  };
}

export default nextPiece;
