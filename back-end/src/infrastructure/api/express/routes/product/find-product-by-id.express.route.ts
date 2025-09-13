import { Request, Response } from "express";
import { FindProductByIdUseCase, FindProductByIdOutput } from "../../../../../usecases/product/findById";
import { HttpMethod, Route } from "../route";
import { ProductNotFoundError } from "../../../../../domain/product/errors/ProductNotFoundError";

type FindProductResponse = {
  id: string
  name: string
  price: number
  category: string
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
      try {
        const { id } = request.params

        if (!id) { return }

        const product = await this.findProductByIdService.execute({ id })

        const productBody = this.present(product)
        response.status(200).json(productBody).send()
      } catch (error) {
        if (error instanceof ProductNotFoundError) {
          response.status(404).json({ message: error.message })
          return
        }

        response.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }

  private present(output: FindProductByIdOutput): FindProductResponse {
    if (!output) return {} as FindProductResponse

    return {
      id: output.product.id,
      name: output.product.name,
      price: output.product.price,
      category: output.product.category,
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
