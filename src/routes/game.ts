import Router from "koa-router";

const router = new Router({
  prefix: "/game",
});

router.post("/start", () => {
  throw new Error("Not implemented!");
});

router.post("/select", () => {
  throw new Error("Not implemented!");
});

export const greetingsRouter = router;
