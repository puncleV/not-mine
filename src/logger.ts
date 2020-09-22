export class Logger {
  constructor(private subject: string) {}

  get prefix() {
    return `${this.subject}: `;
  }

  log(...args: any[]) {
    console.log(this.prefix, ...args);
  }

  error(...args: any[]) {
    console.error(this.prefix, ...args);
  }

  info(...args: any[]) {
    console.info(this.prefix, ...args);
  }

  // todo add env condition
  debug(...args: any[]) {
    console.debug(this.prefix, ...args);
  }
}

export const createLogger = (subject: string) => new Logger(subject);
