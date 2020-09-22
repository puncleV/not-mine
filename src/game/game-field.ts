import _ from "lodash";

import { EmptyCell } from "./empty-cell";
import { Mine } from "./mine";
import { ICell, ICoordinates, ISize } from "./types";

export class GameField {
  private field: ICell[][];
  private _size: ISize;

  constructor({ size, withBombs = false }: { size: ISize; withBombs: boolean }) {
    this.field = new Array(size.x)
      .fill([])
      .map(() => new Array(size.y).fill("").map(() => (withBombs ? new Mine() : new EmptyCell())));
    this._size = size;
  }

  public getCell(coordinates: ICoordinates) {
    return this.field[coordinates.x][coordinates.y];
  }

  get size() {
    return this._size;
  }

  isOutOfRange(coordinates: ICoordinates) {
    return coordinates.x < 0 || coordinates.y < 0 || coordinates.x >= this.size.x || coordinates.y >= this.size.y;
  }

  plant(coordinates: ICoordinates) {
    this.field[coordinates.x][coordinates.y] = new Mine();

    for (let increaseMinesX = coordinates.x - 1; increaseMinesX <= coordinates.x + 1; increaseMinesX += 1) {
      for (let increaseMinesY = coordinates.y - 1; increaseMinesY <= coordinates.y + 1; increaseMinesY += 1) {
        if (!this.isOutOfRange({ x: increaseMinesX, y: increaseMinesY })) {
          this.field[increaseMinesX][increaseMinesY].increaseNearbyMinesCount();
        }
      }
    }
  }

  toString() {
    return this.field.map((row) => row.map((cell) => cell.toString()).join(" ")).join("\n");
  }

  reveal(coordinates: ICoordinates): Array<{ x: number; y: number; value: number }> {
    const cell = this.getCell(coordinates);

    if (cell.isMine) {
      cell.reveal();

      return [
        {
          ...coordinates,
          value: cell.minesAround,
        },
      ];
    }

    if (cell.minesAround > 0) {
      cell.reveal();

      return [
        {
          ...coordinates,
          value: cell.minesAround,
        },
      ];
    }

    cell.reveal();
    const revealed = [];

    revealed.push({
      ...coordinates,
      value: cell.minesAround,
    });

    for (let revealMinesX = coordinates.x - 1; revealMinesX <= coordinates.x + 1; revealMinesX += 1) {
      for (let revealMinesY = coordinates.y - 1; revealMinesY <= coordinates.y + 1; revealMinesY += 1) {
        const coordinatesToReveal = {
          x: revealMinesX,
          y: revealMinesY,
        };
        if (
          !this.isOutOfRange({ x: revealMinesX, y: revealMinesY }) &&
          (coordinatesToReveal.x !== coordinates.x || coordinatesToReveal.y !== coordinates.y) &&
          !this.getCell(coordinatesToReveal).revealed
        ) {
          // todo get rid of recursion
          revealed.push(this.reveal(coordinatesToReveal));
        }
      }
    }

    return _.flatten(revealed);
  }
}
