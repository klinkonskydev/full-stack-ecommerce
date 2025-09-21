import { Category } from "../../domain/category/entity/category";
import { CategoryRepository } from "../../domain/repository/category";
import { UseCase } from "../usecase";

export type FindAllCategoriesOutput = {
  categories: {
    id: number
    name: string
  }[]
}

export class FindAllCategoriesUseCase implements UseCase<void, FindAllCategoriesOutput> {
  private constructor(private readonly categoryRepository: CategoryRepository) {}

  public static create(categoryRepository: CategoryRepository) {
    return new FindAllCategoriesUseCase(categoryRepository)
  }

  async execute(): Promise<FindAllCategoriesOutput> {
    const categories = await this.categoryRepository.findAll()
    return this.present(categories)
  }

  public present(categories: Category[]): FindAllCategoriesOutput {
    return {
      categories: categories
    }
  }
}
