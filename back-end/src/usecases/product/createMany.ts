import { Product } from "../../domain/product/entity/product"
import { EmptyProductsBodyError } from "../../domain/product/errors/EmptyProductsBodyError"
import { ProductRepository } from "../../domain/product/repository/product"
import { UseCase } from "../usecase"

export type CreateManyProductsInput = {
  products: {
    name: string
    price: number
  }[]
}

export type CreateManyProductsOutput = {
  id: string
}[]

export class CreateManyProductsUseCase implements UseCase<CreateManyProductsInput, CreateManyProductsOutput> {
  private constructor(private readonly productRepository: ProductRepository) {}

  public static create(productRepository: ProductRepository) {
    return new CreateManyProductsUseCase(productRepository)
  }

  public async execute({ products }: CreateManyProductsInput): Promise<CreateManyProductsOutput> {
    if (!products.length) throw new EmptyProductsBodyError()
    let productsBody = [] as Product[]
    
    for (let product of products) {
      productsBody.push(Product.create(product.name, product.price))
    }

    await this.productRepository.saveMany(productsBody)

    return this.present(productsBody)
  }

  private present(products: Product[]): CreateManyProductsOutput {
    return products.map(({ id }) => ({ id }))
  }
}
