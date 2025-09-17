export class InvalidCategoryError extends Error {
  constructor(categoryName: string) {
    super(`Category ${categoryName} is not a valid category`)
    this.name = 'InvalidCategoryError'
  }
}
