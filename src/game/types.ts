import { GameField } from "./game-field";

export interface ICell {
  minesAround: number;
  increaseNearbyMinesCount: () => void;
  revealed: boolean;
  reveal: () => void;
  isMine: boolean;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export type ISize = ICoordinates;

export interface IPlantParams {
  exceptCoordinates: ICoordinates;
  bombsCount: number;
  field: GameField;
}

export interface IMinePlanterStrategy {
  plant: (params: IPlantParams) => void;
}
