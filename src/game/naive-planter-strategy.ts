import _ from "lodash";

import { IMinePlanterStrategy, IPlantParams } from "./types";

export class NaivePlanterStrategy implements IMinePlanterStrategy {
  plant({ exceptCoordinates, bombsCount, field }: IPlantParams) {
    let bombsToPlant = bombsCount;

    for (; bombsToPlant > 0; ) {
      const x = _.random(0, field.size.x - 1);
      const y = _.random(0, field.size.y - 1);

      // todo probably can make SomeClassName.Equals or something
      if (exceptCoordinates.x === x && exceptCoordinates.y === y) {
        continue;
      }

      if (field.isOutOfRange({ x, y }) || field.getCell({ x, y }).isMine) {
        continue;
      }

      field.plant({ x, y });

      bombsToPlant -= 1;
    }
  }
}
