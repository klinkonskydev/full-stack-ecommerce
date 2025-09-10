export class ProductNotFoundError extends Error {
  constructor () {
    super('Product not Found')
    this.name = "ProductNotFoundError"
  }
}
