export class Greeter {
  private subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }

  public greeting() {
    // tslint:disable-next-line: no-console
    return `Hello ${this.subject}!`;
  }
}
