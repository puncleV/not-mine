import { GameRepository } from "./repositories";

export interface ICustomAppContext {
  repositories: Record<string, GameRepository>;
}
