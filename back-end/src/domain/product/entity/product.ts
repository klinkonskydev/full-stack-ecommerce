export type ProductCategory = 
  | 'appetizers'
  | 'main_courses'
  | 'side_dishes'
  | 'desserts'
  | 'soft_drinks'
  | 'hot_beverages'
  | 'alcoholic_beverages'
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'kids_menu'
  | 'vegetarian'
  | 'vegan'
  | 'gluten_free'
  | 'combos'
  | 'seasonal'
  | 'extras'
  | 'others'

export const ProductCategory = {
  APPETIZERS: 'appetizers',
  MAIN_COURSES: 'main_courses',
  SIDE_DISHES: 'side_dishes',
  DESSERTS: 'desserts',
  SOFT_DRINKS: 'soft_drinks',
  HOT_BEVERAGES: 'hot_beverages',
  ALCOHOLIC_BEVERAGES: 'alcoholic_beverages',
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  KIDS_MENU: 'kids_menu',
  VEGETARIAN: 'vegetarian',
  VEGAN: 'vegan',
  GLUTEN_FREE: 'gluten_free',
  COMBOS: 'combos',
  SEASONAL: 'seasonal',
  EXTRAS: 'extras',
  OTHERS: 'others',
} as const

export type ProductProps = {
  id: string
  name: string
  price: number
  quantity: number
  category: ProductCategory
}

export class Product {
  private constructor(private readonly props: ProductProps) {}

  public static create(name: string, price: number, category: ProductCategory) {
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      price,
      category,
      quantity: 0
    })
  }

  public static with(product: ProductProps) {
    return new Product(product)
  }

  public get id() {
    return this.props.id
  }

  public get name() {
    return this.props.name
  }

  public get price() {
    return this.props.price
  }

  public get quantity() {
    return this.props.quantity
  }

  public get category() {
    return this.props.category
  }

  public increaseQuantity(quantity: number) {
    this.props.quantity += quantity
  }

  public decreaseQuantity(quantity: number) {
    this.props.quantity -= quantity
  }
}
