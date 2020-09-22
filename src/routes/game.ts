import Router from "koa-router";

import { ICustomAppContext } from "../types";

const router = new Router<ICustomAppContext, ICustomAppContext>({
  prefix: "/game",
});

router.post("/start", (ctx) => {
  ctx.body = ctx.repositories.gameRepository.create(ctx.request.body.grid_size, ctx.request.body.bomb_quantity);

  console.table(ctx.repositories.gameRepository.get(ctx.body));
});

router.post("/select", (ctx) => {
  const game = ctx.repositories.gameRepository.get(ctx.body.game_id);

  if (game == null) {
    throw new Error("Cant find a game");
  }

  ctx.body = game.select(ctx.body.grid_position);
});

export const greetingsRouter = router;
