import { Category } from "../category/entity/category";

export interface CategoryRepository {
  findAll(): Promise<Category[]>
  findById(id: string): Promise<Category>
  findByName(name: string): Promise<Category>
}
