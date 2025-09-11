import { Request, Response } from "express";
import { DeleteProductUseCase } from "../../../../../usecases/product/delete";
import { HttpMethod, Route } from "../route";
import { ProductNotFoundError } from "../../../../../domain/product/errors/ProductNotFoundError";

export class DeleteProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteProductService: DeleteProductUseCase
  ) {}

  public static create(deleteProductService: DeleteProductUseCase) {
    return new DeleteProductRoute('/products/:id', HttpMethod.DELETE, deleteProductService)
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { id } = request.params
        if (!id) return;

        const { name } = await this.deleteProductService.execute({ id })
        response.status(204).send(`Product ${name} deleted successfully.`)
      } catch (error) {
        if (error instanceof ProductNotFoundError) {
          response.status(404).json({ message: error.message })
          return
        }

        response.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }

  public getMethod(): HttpMethod {
    return this.method
  }

  getPath(): string {
    return this.path
  }
}
