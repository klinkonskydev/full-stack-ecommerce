import { HttpMethod, Route } from "../route";
import { CreateManyProductsInput, CreateManyProductsOutput, CreateManyProductsUseCase } from "../../../../../usecases/product/createMany";
import { Request, Response } from "express";
import { EmptyProductsBodyError } from "../../../../../domain/product/errors/EmptyProductsBodyError";

export type CreateManyProductsResponse = {
  id: string
}[]

export class CreateManyProductsRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createManyProductService: CreateManyProductsUseCase
  ) {}

  public static create(createManyProductService: CreateManyProductsUseCase) {
    return new CreateManyProductsRoute('/products/populate', HttpMethod.POST, createManyProductService)
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const body = request.body

        const input: CreateManyProductsInput = {
          products: body?.products ?? []
        }

        const output: CreateManyProductsOutput = await this.createManyProductService.execute(input)

        const responseBody = this.present(output)
        response.status(201).json(responseBody).send()
      } catch (error) {
        if (error instanceof EmptyProductsBodyError) {
          response.status(404).json({ message: error.message })
          return;
        }
        
        response.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }

  private present(input: CreateManyProductsResponse): CreateManyProductsResponse {
    const ids = input.map(({ id }) => ({ id }))
    return ids
  }

  public getMethod() {
    return this.method
  }

  public getPath() {
    return this.path
  }
}
