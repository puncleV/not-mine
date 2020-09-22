import Koa from "koa";

export const errorHandler: Koa.Middleware<Koa.Context> = async (ctx, next) => {
  // try {
  await next();
  // } catch (e) {
  //   ctx.status = 500;
  //
  //   ctx.body = {
  //     message: e.message,
  //   };
  //
  //   ctx.stackTrace = e.stack;
  // }
};
