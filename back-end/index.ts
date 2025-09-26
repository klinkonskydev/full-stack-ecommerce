import { ProductRepositoryPrisma } from './src/infrastructure/product.repository.prisma'
import { CategoryRepositoryPrisma } from './src/infrastructure/category.repository.prisma'

import { CreateProductUseCase } from './src/usecases/product/create'
import { CreateManyProductsUseCase } from './src/usecases/product/createMany'
import { ListProductUseCase } from './src/usecases/product/list'
import { FindProductByIdUseCase } from './src/usecases/product/findById'
import { DeleteProductUseCase } from './src/usecases/product/delete'

import { FindAllCategoriesUseCase } from './src/usecases/category/findAll'
import { FindCategoryByIdUseCase } from './src/usecases/category/findById'
import { FindCategoryByNameUseCase } from './src/usecases/category/findByName'

import { CreateProductRoute } from './src/infrastructure/api/express/routes/product/create-product.express.route'
import { CreateManyProductsRoute } from './src/infrastructure/api/express/routes/product/create-many-products.express.route'
import { ListProductRoute } from './src/infrastructure/api/express/routes/product/list-product.express.route'
import { FindProductByIdRoute } from './src/infrastructure/api/express/routes/product/find-product-by-id.express.route'
import { DeleteProductRoute } from './src/infrastructure/api/express/routes/product/delete-product.express.route'

import { FindAllCategoriesRoute } from './src/infrastructure/api/express/routes/category/find-all-categories.express.route'
import { FindCategoryByIdRoute } from './src/infrastructure/api/express/routes/category/find-category-by-id.express.route'
import { FindCategoryByNameRoute  } from './src/infrastructure/api/express/routes/category/find-category-by-name.express.route'

import { ApiExpress } from './src/infrastructure/api/express/api.express'

import { prisma } from './src/package/prisma/prisma'

function main() {
  const productRepository = ProductRepositoryPrisma.create(prisma)
  const categoryRepository = CategoryRepositoryPrisma.create(prisma)

  const createProductUseCase = CreateProductUseCase.create(productRepository)
  const createManyProductsUseCase = CreateManyProductsUseCase.create(productRepository)
  const listProductUseCase = ListProductUseCase.create(productRepository)
  const findProductByIdUseCase = FindProductByIdUseCase.create(productRepository)
  const deleteProductUseCase = DeleteProductUseCase.create(productRepository)

  const findAllCategoriesUseCase = FindAllCategoriesUseCase.create(categoryRepository)
  const findCategoryByIdUseCase = FindCategoryByIdUseCase.create(categoryRepository)
  const findCategoryByNameUseCase = FindCategoryByNameUseCase.create(categoryRepository)

  const createRoute = CreateProductRoute.create(createProductUseCase)
  const createManyRoute = CreateManyProductsRoute.create(createManyProductsUseCase)
  const listRoute = ListProductRoute.create(listProductUseCase)
  const findRoute = FindProductByIdRoute.create(findProductByIdUseCase)
  const deleteRoute = DeleteProductRoute.create(deleteProductUseCase)

  const findAllCategoryRoute = FindAllCategoriesRoute.create(findAllCategoriesUseCase)
  const findCategoryByIdRoute = FindCategoryByIdRoute.create(findCategoryByIdUseCase)
  const findCategoryByNameRoute = FindCategoryByNameRoute.create(findCategoryByNameUseCase)

  const productRoutes = [createRoute, listRoute, findRoute, deleteRoute, createManyRoute]
  const categoryRoutes = [findAllCategoryRoute, findCategoryByIdRoute, findCategoryByNameRoute]

  const port = Number(process.env.PORT) || 8080

  const api = ApiExpress.create([...productRoutes, ...categoryRoutes]);
  api.start(port)
}

main()
