export type ProductProps = {
  id: string
  name: string
  price: number
  quantity: number
}

export class Product {
  private constructor(private readonly props: ProductProps) {}

  public static create(name: string, price: number) {
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      price,
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
