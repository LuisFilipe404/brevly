export class LinkNotExists extends Error {
  constructor() {
    super("Link não existe");
  }
}
