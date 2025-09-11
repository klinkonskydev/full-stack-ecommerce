import { Product } from "../entity/product";

// Gateway/Repository defines which methods will be used in controllers.
export interface ProductRepository {
  save(product: Product): Promise<void>
  saveMany(products: Product[]): Promise<void>
  list(): Promise<Product[]>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Product | null>
}
