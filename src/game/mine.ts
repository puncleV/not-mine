import { DEFAULT_MINES_AROUND } from "./constants";
import { ICell } from "./types";

export class Mine implements ICell {
  private _revealed = false;

  get minesAround() {
    return DEFAULT_MINES_AROUND.MINE;
  }

  get revealed() {
    return this._revealed;
  }

  reveal() {
    this._revealed = true;
  }

  increaseNearbyMinesCount() {
    return;
  }

  get isMine() {
    return true;
  }

  toString() {
    return `${this._revealed ? "X" : "Z"}`;
  }
}
