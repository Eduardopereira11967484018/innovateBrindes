export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface DeliveryAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface Order {
  id: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  total: number
  createdAt: string
  updatedAt: string
  deliveryAddress: DeliveryAddress
  trackingCode?: string
  paymentMethod: "credit_card" | "pix"
  paymentStatus: "pending" | "paid" | "failed"
}

