export class AliasAlreadyExists extends Error {
  constructor() {
    super("Link encurtado já existe.");
  }
}
