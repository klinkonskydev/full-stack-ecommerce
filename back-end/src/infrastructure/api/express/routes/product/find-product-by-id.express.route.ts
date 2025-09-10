import { Request, Response } from "express";
import { FindProductByIdUseCase, FindProductByIdOutput } from "../../../../../usecases/product/findById";
import { HttpMethod, Route } from "../route";

type FindProductResponse = {
  id: string
  name: string
  price: number
  quantity: number
}

export class FindProductByIdRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findProductByIdService: FindProductByIdUseCase
  ) {}

  public static create(findProductByIdServie: FindProductByIdUseCase) {
    return new FindProductByIdRoute('/products/:id', HttpMethod.GET, findProductByIdServie)
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { id } = request.params

      if (!id) {
        return
      }

      const product = await this.findProductByIdService.execute({ id })

      const productBody = this.present(product)
      response.status(200).json(productBody).send()
    }
  }

  private present(output: FindProductByIdOutput): FindProductResponse {
    if (!output) return {} as FindProductResponse

    return {
      id: output.product.id,
      name: output.product.name,
      price: output.product.price,
      quantity: output.product.quantity,
    }
  }

  public getPath() {
      return this.path
  }

  public getMethod() {
      return this.method
  }
}
