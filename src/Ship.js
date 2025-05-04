export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
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

  hit() {
    this.hits++;
    if (this.hits >= this.length) {
      this.sunk = true;
    }
  }

  isSunk() {
    return this.sunk;
  }
}
