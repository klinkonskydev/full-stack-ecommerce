import { Request, Response } from "express";
import { FindCategoryByIdOutput, FindCategoryByIdUseCase } from "../../../../../usecases/category/findById";
import { HttpMethod, Route } from "../route";
import { CategoryNotFoundError } from "../../../../../domain/category/errors/CategoryNotFound";

export type FindCategoryByIdResponse = {
  id: number
  name: string
}

export class FindCategoryByIdRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase
  ) {}

  public static create(findCategoryByIdUseCase: FindCategoryByIdUseCase) {
    return new FindCategoryByIdRoute('/categories/:id', HttpMethod.GET, findCategoryByIdUseCase)
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { id  } = request.params

        if (!id) return
        
        const category = await this.findCategoryByIdUseCase.execute({ id: Number(id)  })

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

  private present(output: FindCategoryByIdOutput): FindCategoryByIdResponse {
    if (!output) return {} as FindCategoryByIdResponse

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
