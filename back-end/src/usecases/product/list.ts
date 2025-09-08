import { Product } from "../../domain/product/entity/product"
import { ProductRepository } from "../../domain/product/repository/product"
import { UseCase } from "../usecase"

export type ListProductInput = void
export type ListProductOutput = {
  products: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export class ListProductUseCase implements UseCase<ListProductInput, ListProductOutput> {
  private constructor(private readonly productRepository: ProductRepository) {}

  public static create(productRepository: ProductRepository) {
    return new ListProductUseCase(productRepository)
  }

  public async execute(): Promise<ListProductOutput> {
    const products = await this.productRepository.list()
    return this.presentOutput(products)
  }

  public presentOutput(products: Product[]): ListProductOutput {
    return {
      products: products
    }
  }
}
