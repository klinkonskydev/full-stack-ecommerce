import { PrismaClient } from "@prisma/client";
import { Product } from "../domain/product/entity/product";
import { ProductRepository } from "../domain/product/repository/product";

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

    if (!product) return null;

    return Product.with({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaClient.product.delete({ where: { id } })
  }

  async saveMany(products: Product[]) {
    const data = [];

    for (let product of products) {
      data.push({ 
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      })
    }

    await this.prismaClient.product.createMany({
      data
    })
  }
}
