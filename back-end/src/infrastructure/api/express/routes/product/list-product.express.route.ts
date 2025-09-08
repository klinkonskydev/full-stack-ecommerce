import { HttpMethod, Route } from "../route"
import { ListProductOutput, ListProductUseCase } from "../../../../../usecases/product/list"
import { Request, Response } from "express"

export type ListProductResponse = {
  products: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUseCase
  ) {}

  public static create(listProductService: ListProductUseCase) {
    return new ListProductRoute('/products', HttpMethod.GET, listProductService)
  }

  public getHandler() {
    return async (_request: Request, response: Response) => {
      const output = await this.listProductService.execute()
      const responseBody = this.present(output)
      response.status(200).json(responseBody).send()
    }
  }

  private present(input: ListProductOutput): ListProductResponse {
    const response: ListProductResponse = {
      products: input.products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity
      }))
    }

    return response
  }

  public getMethod() {
    return this.method
  }

  public getPath() {
    return this.path
  }
}
