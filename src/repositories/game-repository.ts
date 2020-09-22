import { v4 } from "uuid";

import { Game } from "../game";
import { NaivePlanterStrategy } from "../game/naive-planter-strategy";
import { ISize } from "../game/types";

export class GameRepository {
  private games = new Map<string, Game>();

  create(size: ISize, bombsCount: number) {
    const id = v4();
    const game = new Game(
      {
        minePlanterStrategy: new NaivePlanterStrategy(),
      },
      size,
      bombsCount,
    );

    this.games.set(id, game);

    return id;
  }

  get(id: string) {
    return this.games.get(id);
  }
}
