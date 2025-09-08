import { Product } from "../entity/product";

// Gateway/Repository defines which methods will be used in controllers.
export interface ProductRepository {
  save(product: Product): Promise<void>
  list(): Promise<Product[]>
}
