import { config } from "../config";
import { server } from "./server";

server.listen(config.port);

// eslint-disable-next-line no-console
console.log(`server started at: ${config.port}`);
