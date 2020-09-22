import Koa from "koa";

import { config } from "../../config";
import { createLogger } from "../logger";

const logger = createLogger("REQUEST");

const SHOW_STACKTRACE = config.showErrorStacktrace;

export const requestLogger: Koa.Middleware<Koa.Context> = async (ctx, next) => {
  const methodUrl = `${ctx.request.method} ${ctx.request.originalUrl}`;

  logger.info(`--> ${methodUrl}`);

  const timeStart = Date.now();
  await next();

  if (ctx.status >= 200 && ctx.status < 400) {
    const body = JSON.stringify(ctx.body);

    logger.info(
      `<-- ${methodUrl}`,
      {
        body: body,
        bodyLength: body.length,
      },
      {
        status: ctx.status,
        time: `${Date.now() - timeStart}ms`,
      },
    );
  } else {
    logger.error(`<-- ${methodUrl}`, {
      body: JSON.stringify(ctx.body),
      status: ctx.status,
      time: `${Date.now() - timeStart}ms`,
      stack: SHOW_STACKTRACE ? ctx.stackTrace : undefined,
    });
  }
};
