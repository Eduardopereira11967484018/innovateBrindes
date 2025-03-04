export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  colors?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

