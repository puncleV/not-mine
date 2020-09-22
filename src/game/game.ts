import { GameField } from "./game-field";
import { ICoordinates, IMinePlanterStrategy, ISize } from "./types";

export interface IGameDependencies {
  minePlanterStrategy: IMinePlanterStrategy;
}

export class Game {
  // todo make private
  public gameField: GameField;
  private minePlanterStrategy: IMinePlanterStrategy;
  private bombsCount: number;
  // CS reference
  private bombHasBeenPlanted = false;

  constructor({ minePlanterStrategy }: IGameDependencies, size: ISize, bombsCount: number) {
    if (size.x * size.y < bombsCount || bombsCount < 0) {
      // todo better text
      throw new Error("No, you can't");
    }
    this.minePlanterStrategy = minePlanterStrategy;

    const isEveryCellIsBomb = size.x * size.y === bombsCount;

    this.gameField = new GameField({ size, withBombs: isEveryCellIsBomb });
    this.bombsCount = bombsCount;
    this.bombHasBeenPlanted = isEveryCellIsBomb;
  }

  plantIfNotPlanted(exceptCoordinates: ICoordinates) {
    if (this.bombHasBeenPlanted) {
      return;
    }

    // todo maybe pure function or something
    this.minePlanterStrategy.plant({
      bombsCount: this.bombsCount,
      exceptCoordinates,
      field: this.gameField,
    });

    this.bombHasBeenPlanted = true;
  }

  select(coordinates: ICoordinates) {
    this.plantIfNotPlanted(coordinates);

    return this.gameField.reveal(coordinates);
  }
}
