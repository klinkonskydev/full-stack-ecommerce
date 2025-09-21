import { Category } from "@prisma/client";
import { CategoryRepository } from "../../domain/repository/category";
import { UseCase } from "../usecase";
import { CategoryNotFoundError } from "../../domain/category/errors/CategoryNotFound";

export type FindCategoryByIdInput = { id: number }
export type FindCategoryByIdOutput = {
  id: number
  name: string
} | null

export class FindCategoryByIdUseCase implements UseCase<FindCategoryByIdInput, FindCategoryByIdOutput> {
  private constructor(private readonly categoryRepository: CategoryRepository) {}

  public static create(categoryRepository: CategoryRepository) {
    return new FindCategoryByIdUseCase(categoryRepository)
  }

  public async execute({ id }: FindCategoryByIdInput): Promise<FindCategoryByIdOutput> {
    const category = await this.categoryRepository.findById(id)
    if (!category) throw new CategoryNotFoundError()
    return this.present(category)
  }

  private present(category: Category): FindCategoryByIdOutput {
    return {
      id: category.id,
      name: category.name
    }
  }
}
