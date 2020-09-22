import Router from "koa-router";

import { ICustomAppContext } from "../types";

const router = new Router<ICustomAppContext, ICustomAppContext>({
  prefix: "/game",
});

router.post("/start", (ctx) => {
  ctx.body = {
    game_id: ctx.repositories.gameRepository.create(ctx.request.body.grid_size, ctx.request.body.bomb_quantity),
  };
});

router.post("/select", (ctx) => {
  const game = ctx.repositories.gameRepository.get(ctx.request.body.game_id);

  if (game == null) {
    throw new Error("Cant find a game");
  }

  const revealed = game.select(ctx.request.body.grid_position);

  if (revealed.some((r) => r.value === -1)) {
    ctx.repositories.gameRepository.delete(ctx.request.body.game_id);
  }

  console.log(game.gameField.toString());

  ctx.body = {
    results: revealed,
  };
});

export const greetingsRouter = router;
