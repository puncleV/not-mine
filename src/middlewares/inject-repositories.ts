import Koa from "koa";

import * as repositories from "../repositories/di";

export const injectRepositories: Koa.Middleware<Koa.Context> = async (ctx, next) => {
  ctx.repositories = repositories;

  await next();
};
