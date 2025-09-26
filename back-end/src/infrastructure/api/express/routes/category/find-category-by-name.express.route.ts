import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CategoryNotFoundError } from "../../../../../domain/category/errors/CategoryNotFound";
import { FindCategoryByNameOutput, FindCategoryByNameUseCase } from "../../../../../usecases/category/findByName";

export type FindCategoryByNameResponse = {
  id: number
  name: string
}

export class FindCategoryByNameRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findCategoryByIdUseCase: FindCategoryByNameUseCase
  ) {}

  public static create(findCategoryByIdUseCase: FindCategoryByNameUseCase) {
    return new FindCategoryByNameRoute('/categories/name/:name', HttpMethod.GET, findCategoryByIdUseCase)
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { name } = request.params

        if (!name) return
        
        const category = await this.findCategoryByIdUseCase.execute({ name })

        const productBody = this.present(category)
        response.status(200).json(productBody).send()
      } catch (error) {
        if (error instanceof CategoryNotFoundError) {
          response.status(404).json({ message: error.message })
          return;
        }

        response.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }

  private present(output: FindCategoryByNameOutput): FindCategoryByNameResponse {
    if (!output) return {} as FindCategoryByNameResponse

    return {
      id: output.id,
      name: output.name
    }
  }

  public getMethod(): HttpMethod {
    return this.method
  }

  public getPath(): string {
    return this.path
  }
}
