import { Category } from "@prisma/client";
import { CategoryRepository } from "../../domain/repository/category";
import { UseCase } from "../usecase";
import { CategoryNotFoundError } from "../../domain/category/errors/CategoryNotFound";

export type FindCategoryByNameInput = { name: string }
export type FindCategoryByNameOutput = {
  id: number
  name: string
} | null

export class FindCategoryByNameUseCase implements UseCase<FindCategoryByNameInput, FindCategoryByNameOutput> {
  private constructor(private readonly categoryRepository: CategoryRepository) {}

  public static create(categoryRepository: CategoryRepository) {
    return new FindCategoryByNameUseCase(categoryRepository)
  }

  public async execute({ name}: FindCategoryByNameInput): Promise<FindCategoryByNameOutput> {
    const category = await this.categoryRepository.findByName(name)
    if (!category) throw new CategoryNotFoundError()
    return this.present(category)
  }

  private present(category: Category): FindCategoryByNameOutput {
    return {
      id: category.id,
      name: category.name
    }
  }
}
