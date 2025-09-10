import { Product } from "../../domain/product/entity/product";
import { ProductRepository } from "../../domain/product/repository/product";
import { UseCase } from "../usecase";

export type FindProductByIdInput = { id: string }
export type FindProductByIdOutput = {
  product: {
    id: string,
    name: string
    price: number
    quantity: number
  }
} | null

export class FindProductByIdUseCase implements UseCase<FindProductByIdInput, FindProductByIdOutput> {
  private constructor(private readonly productRepository: ProductRepository) {}

  public static create(productRepository: ProductRepository) {
    return new FindProductByIdUseCase(productRepository)
  }

  public async execute({ id }: FindProductByIdInput): Promise<FindProductByIdOutput> {
    const product = await this.productRepository.findById(id)
    return this.present(product)
  }

  public present(product: Product | null): FindProductByIdOutput {
    if (!product) return null

    return { 
      product: { 
        id: product.id,
        name: product.name,
        price: product.price ,
        quantity: product.quantity
      } 
    }
  }
}
