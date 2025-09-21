import { PrismaClient } from "@prisma/client";
import { CategoryRepository } from "../domain/repository/category";
import { Category } from "../domain/category/entity/category";

export class CategoryRepositoryPrisma implements CategoryRepository {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new CategoryRepositoryPrisma(prismaClient)
  }
  async findAll(): Promise<Category[]> {
    const categories = await this.prismaClient.category.findMany()

    const categoriesList = categories.map((category) => Category.with({
      id: category.id,
      name: category.name
    }))

    return categoriesList
  }

  async findById(id: number): Promise<Category | null> {
    const category = await this.prismaClient.category.findUnique({
      where: { id }
    })

    if (!category) return null

    return Category.with({
      id: category.id,
      name: category.name
    })
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prismaClient.category.findUnique({
      where: { name }
    })
    
    if (!category) return null

    return Category.with({
      id: category.id,
      name: category.name
    })
  }
}
