import _ from "lodash";

import { IMinePlanterStrategy, IPlantParams } from "./types";

export class NaivePlanterStrategy implements IMinePlanterStrategy {
  plant({ exceptCoordinates, bombsCount, field }: IPlantParams) {
    let bombsToPlant = bombsCount;

    for (; bombsToPlant > 0; ) {
      const x = _.random(0, field.size.x);
      const y = _.random(0, field.size.y);

      // todo probably can make SomeClassName.Equals or something
      if (exceptCoordinates.x === x && exceptCoordinates.y === y) {
        continue;
      }

      if (field.getCell({ x, y }).isMine || field.isOutOfRange({ x, y })) {
        continue;
      }

      field.plant({ x, y });

      bombsToPlant -= 1;
    }
  }
}
