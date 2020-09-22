import { DEFAULT_MINES_AROUND } from "./constants";
import { ICell } from "./types";

export class EmptyCell implements ICell {
  private minesNearby = DEFAULT_MINES_AROUND.NOT_MINE;
  private _revealed = false;

  get minesAround() {
    return this.minesNearby;
  }

  get revealed() {
    return this._revealed;
  }

  reveal() {
    this._revealed = true;
  }

  increaseNearbyMinesCount() {
    this.minesNearby += 1;
  }

  get isMine() {
    return false;
  }

  toString() {
    return `${this.minesNearby}`;
  }
}
