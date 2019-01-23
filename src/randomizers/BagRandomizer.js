import { shuffle } from '../util';

class BagRandomizer {
  constructor(random) {
    // TODO: use piece constants?
    this.bag = [0, 1, 2, 3, 4, 5, 6];
    this.random = random;
    this.index = this.bag.length;
  }

  next() {
   if (this.index === this.bag.length) {
      shuffle(this.bag, this.random);
      this.index = 0;
    }

    return this.bag[this.index++];
  }
}

export default BagRandomizer;
