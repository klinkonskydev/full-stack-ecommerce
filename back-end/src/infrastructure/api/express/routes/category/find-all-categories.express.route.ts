import { Request, Response } from "express";
import { FindAllCategoriesOutput, FindAllCategoriesUseCase } from "../../../../../usecases/category/findAll";
import { HttpMethod, Route } from "../route";

type FindAllCategoriesResponse = {
  categories: {
    id: number
    name: string
  }[]
}

export class FindAllCategoriesRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase
  ) {}

  public static create(findAllCategoriesUseCase: FindAllCategoriesUseCase) {
    return new FindAllCategoriesRoute('/categories', HttpMethod.GET, findAllCategoriesUseCase)
  }

  public getHandler() {
    return async (_: Request, response: Response) => {
      const output: FindAllCategoriesOutput = await this.findAllCategoriesUseCase.execute()
      const responseBody = this.present(output)
      response.status(200).send(responseBody).send()
    }
  }

  private present(input: FindAllCategoriesOutput): FindAllCategoriesResponse {
    return {
      categories: input.categories.map(c => ({
        id: c.id,
        name: c.name
      }))
    }
  }

  public getMethod(): HttpMethod {
    return this.method
  }

  public getPath(): string {
    return this.path
  }
}
