export class EmptyProductsBodyError extends Error {
  constructor() {
    super('Products field is required.')
    this.name = 'EmptyProductsBodyError'
  }
}
