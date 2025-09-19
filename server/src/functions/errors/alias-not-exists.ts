export class AliasNotExists extends Error {
  constructor() {
    super("Link encurtado não existe.");
  }
}
