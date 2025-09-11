import { PrismaClient } from "@prisma/client";
import { Product } from "../domain/product/entity/product";
import { ProductRepository } from "../domain/product/repository/product";
import { ProductNotFoundError } from "../domain/product/errors/ProductNotFoundError";

export class ProductRepositoryPrisma implements ProductRepository {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient)
  }

  async save(product: Product): Promise<void> {
    // Entity -> Prisma
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }

    await this.prismaClient.product.create({ data })
  }

  async list(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany()

    // Prisma -> Entity
    const productList = products.map(prismaProduct => Product.with({
      id: prismaProduct.id,
      name: prismaProduct.name,
      price: prismaProduct.price,
      quantity: prismaProduct.quantity
    }))

    return productList
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prismaClient.product.findUnique({
      where: { id }
    })

    if (!product) throw new ProductNotFoundError();

    return Product.with({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    })
  }

  async delete(id: string): Promise<void> {
    const product = await this.findById(id)

    if (!product) throw new ProductNotFoundError();

    await this.prismaClient.product.delete({
      where: { id }
    })
  }
}
