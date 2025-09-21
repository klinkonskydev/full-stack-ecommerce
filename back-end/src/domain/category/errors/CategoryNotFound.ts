export class CategoryNotFoundError extends Error {
  constructor () {
    super('Category not Found')
    this.name = "CategoryNotFoundError"
  }
}
