import { ProductRepositoryPrisma } from './src/infrastructure/product.repository.prisma'

import { CreateProductUseCase } from './src/usecases/product/create'
import { ListProductUseCase } from './src/usecases/product/list'
import { FindProductByIdUseCase } from './src/usecases/product/findById'

import { CreateProductRoute } from './src/infrastructure/api/express/routes/product/create-product.express.route'
import { ListProductRoute } from './src/infrastructure/api/express/routes/product/list-product.express.route'
import { FindProductByIdRoute } from './src/infrastructure/api/express/routes/product/find-product-by-id.express.route'

import { ApiExpress } from './src/infrastructure/api/express/api.express'

import { prisma } from './src/package/prisma/prisma'

function main() {
  const repository = ProductRepositoryPrisma.create(prisma)

  const createProductUseCase = CreateProductUseCase.create(repository)
  const listProductUseCase = ListProductUseCase.create(repository)
  const findProductByIdUseCase = FindProductByIdUseCase.create(repository)

  const createRoute = CreateProductRoute.create(createProductUseCase)
  const listRoute = ListProductRoute.create(listProductUseCase)
  const findRoute = FindProductByIdRoute.create(findProductByIdUseCase)

  const port = Number(process.env.PORT) || 8080

  const api = ApiExpress.create([createRoute, listRoute, findRoute]);
  api.start(port)
}

main()
