import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { CreateProductInput, CreateProductOutput, CreateProductUseCase } from "../../../../../usecases/product/create"

export type CreateProductResponse = {
  id: string
}

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUseCase
  ) {}

  public static create(createProductService: CreateProductUseCase) {
    return new CreateProductRoute(
      "/products",
      HttpMethod.POST,
      createProductService
    )
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, price } = request.body

      const input: CreateProductInput = {
        name,
        price
      }

      const output: CreateProductOutput = await this.createProductService.execute(input)

      const responseBody = this.present(output)
      response.status(201).json(responseBody).send();
    }
  }

  private present(input: CreateProductResponse): CreateProductResponse {
    const response = { id: input.id }
    return response;
  }

  public getPath() {
    return this.path
  }


  getMethod() {
    return this.method
  }
}
