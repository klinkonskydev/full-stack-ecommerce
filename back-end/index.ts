import { ProductRepositoryPrisma } from './src/infrastructure/product.repository.prisma'

import { CreateProductUseCase } from './src/usecases/product/create'
import { CreateManyProductsUseCase } from './src/usecases/product/createMany'
import { ListProductUseCase } from './src/usecases/product/list'
import { FindProductByIdUseCase } from './src/usecases/product/findById'
import { DeleteProductUseCase } from './src/usecases/product/delete'

import { CreateProductRoute } from './src/infrastructure/api/express/routes/product/create-product.express.route'
import { CreateManyProductsRoute } from './src/infrastructure/api/express/routes/product/create-many-products.express.route'
import { ListProductRoute } from './src/infrastructure/api/express/routes/product/list-product.express.route'
import { FindProductByIdRoute } from './src/infrastructure/api/express/routes/product/find-product-by-id.express.route'
import { DeleteProductRoute } from './src/infrastructure/api/express/routes/product/delete-product.express.route'

import { ApiExpress } from './src/infrastructure/api/express/api.express'

import { prisma } from './src/package/prisma/prisma'

function main() {
  const repository = ProductRepositoryPrisma.create(prisma)

  const createProductUseCase = CreateProductUseCase.create(repository)
  const createManyProductsUseCase = CreateManyProductsUseCase.create(repository)
  const listProductUseCase = ListProductUseCase.create(repository)
  const findProductByIdUseCase = FindProductByIdUseCase.create(repository)
  const deleteProductUseCase = DeleteProductUseCase.create(repository)

  const createRoute = CreateProductRoute.create(createProductUseCase)
  const createManyRoute = CreateManyProductsRoute.create(createManyProductsUseCase)
  const listRoute = ListProductRoute.create(listProductUseCase)
  const findRoute = FindProductByIdRoute.create(findProductByIdUseCase)
  const deleteRoute = DeleteProductRoute.create(deleteProductUseCase)

  const port = Number(process.env.PORT) || 8080

  const api = ApiExpress.create([createRoute, listRoute, findRoute, deleteRoute, createManyRoute]);
  api.start(port)
}

main()
