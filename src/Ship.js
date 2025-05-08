export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = new Array(length).fill(false);
    this.sunk = false;
    this.shipType = this.typeOfShip(length);
  }

  typeOfShip(length) {
    if (length === 1) return 'Patrol Boat';
    if (length === 2) return 'Submarine';
    if (length === 3) return 'Destroyer';
    if (length === 4) return 'Carrier';
    return 'Unknown';
  }

  hit(index) {
    this.hits[index] = true;
    this.sunk = this.hits.every((part) => part === true)
  }

  isSunk() {
    return this.sunk;
  }
}
