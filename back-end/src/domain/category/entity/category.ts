import { InvalidCategoryError } from "../errors/InvalidCategory";

type CategoryName = 'appetizers' | 'main_courses' | 'side_dishes' | 'desserts' | 'soft_drinks' | 'hot_beverages' | 'alcoholic_beverages' | 'breakfast' | 'lunch' | 'dinner' | 'kids_menu' | 'vegetarian' | 'vegan' | 'gluten_free' | 'combos' | 'seasonal' | 'extras' | 'others'

export type CategoryProps = { 
  id: string
  name: CategoryName
}

export class Category {
  static readonly validCategories = [
    'appetizers',
    'main_courses',
    'side_dishes',
    'desserts',
    'soft_drinks',
    'hot_beverages',
    'alcoholic_beverages',
    'breakfast',
    'lunch',
    'dinner',
    'kids_menu',
    'vegetarian',
    'vegan',
    'gluten_free',
    'combos',
    'seasonal',
    'extras',
    'others'
  ] as const;

  private constructor(private readonly props: CategoryProps) {}

  public static create(category: CategoryProps) {
    if (this.validCategories.includes(category.name)) {
      throw new InvalidCategoryError(category.name)
    }

    return new Category(category)
  }

  public get name() {
    return this.props.name
  }
}
