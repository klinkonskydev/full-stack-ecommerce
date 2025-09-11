import { Product } from "../../domain/product/entity/product"
import { ProductNotFoundError } from "../../domain/product/errors/ProductNotFoundError"
import { ProductRepository } from "../../domain/product/repository/product"
import { UseCase } from "../usecase"

export type DeleteProductInput = { id: string }
export type DeleteProductOutput = { name: string }

export class DeleteProductUseCase implements UseCase<DeleteProductInput, DeleteProductOutput> {
  private constructor(private readonly productRepository: ProductRepository) {}

  public static create(productRepository: ProductRepository) {
    return new DeleteProductUseCase(productRepository)
  }

  public async execute({ id }: DeleteProductInput): Promise<DeleteProductOutput> {
    const product = await this.productRepository.findById(id)
    if (!product) throw new ProductNotFoundError()

    await this.productRepository.delete(id)
    return this.present(product)
  }

  private present(product: Product): DeleteProductOutput {
    return { name: product.name }
  }
}
