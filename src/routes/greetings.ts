import Router from "koa-router";

import { Greeter } from "../Greeter";

const router = new Router({
  prefix: "/greetings",
});

router.get("/:name", (ctx) => {
  const greeter = new Greeter(ctx.params.name);

  ctx.body = greeter.greeting();
});

export const greetingsRouter = router;
