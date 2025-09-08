import { Product } from "../../domain/product/entity/product"
import { ProductRepository } from "../../domain/product/repository/product"

import { UseCase } from "../usecase"

export type CreateProductInput = {
  name: string
  price: number
}

export type CreateProductOutput = {
  id: string
}

export class CreateProductUseCase implements UseCase<CreateProductInput, CreateProductOutput> {
  private constructor(private readonly productRepository: ProductRepository) {}

  public static create(productRepository: ProductRepository) {
    return new CreateProductUseCase(productRepository)
  }

  public async execute({ name, price }: CreateProductInput): Promise<CreateProductOutput> {
    const product = Product.create(name, price)

    await this.productRepository.save(product)

    return this.presentOutput(product)
  }

  private presentOutput(product: Product): CreateProductOutput {
    const output: CreateProductOutput = {
      id: product.id
    }

    return output
  }
}
