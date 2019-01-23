import { PIECE_COUNT } from '../components/Piece';

class PureRandomizer {
  constructor(random) {
    this.random = random;
  }

  next() {
    return Math.floor(this.random() * PIECE_COUNT);
  }
}

export default PureRandomizer;
