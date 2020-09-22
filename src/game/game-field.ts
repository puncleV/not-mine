import { EmptyCell } from "./empty-cell";
import { Mine } from "./mine";
import { ICell, ICoordinates, ISize } from "./types";

export class GameField {
  private field: ICell[][];
  private _size: ISize;

  constructor({ size, withBombs = false }: { size: ISize; withBombs: boolean }) {
    this.field = new Array(size.x).fill([]).map(() => new Array(size.y).fill(withBombs ? new Mine() : new EmptyCell()));
    this._size = size;
  }

  public getCell(coordinates: ICoordinates) {
    return this.field[coordinates.x][coordinates.y];
  }

  get size() {
    return this._size;
  }

  isOutOfRange(coordinates: ICoordinates) {
    return coordinates.x < 0 || coordinates.y < 0 || coordinates.x > this.size.x || coordinates.y > this.size.y;
  }

  plant(coordinates: ICoordinates) {
    this.field[coordinates.x][coordinates.y] = new Mine();

    for (let increaseMinesX = coordinates.x - 1; increaseMinesX < coordinates.x + 1; increaseMinesX += 1) {
      for (let increaseMinesY = coordinates.y - 1; increaseMinesY < coordinates.y + 1; increaseMinesY += 1) {
        if (this.isOutOfRange({ x: increaseMinesX, y: increaseMinesY })) {
          this.field[increaseMinesX][increaseMinesY].increaseNearbyMinesCount();
        }
      }
    }
  }
}
