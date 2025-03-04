import type { Order } from "@/types/orders"

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    status: "delivered",
    items: [
      {
        id: "ITEM-001",
        productId: "PROD-001",
        name: "Caneca Personalizada",
        price: 29.9,
        quantity: 2,
        image: "/placeholder.svg",
      },
      {
        id: "ITEM-002",
        productId: "PROD-002",
        name: "Squeeze Térmico",
        price: 45.9,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    total: 105.7,
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-02-18T14:30:00Z",
    deliveryAddress: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Jardim América",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
    trackingCode: "BR123456789",
    paymentMethod: "credit_card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-002",
    status: "shipped",
    items: [
      {
        id: "ITEM-003",
        productId: "PROD-003",
        name: "Kit Executivo",
        price: 89.9,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    total: 89.9,
    createdAt: "2024-02-20T15:00:00Z",
    updatedAt: "2024-02-21T09:00:00Z",
    deliveryAddress: {
      street: "Avenida Paulista",
      number: "1000",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
    },
    trackingCode: "BR987654321",
    paymentMethod: "pix",
    paymentStatus: "paid",
  },
  {
    id: "ORD-003",
    status: "processing",
    items: [
      {
        id: "ITEM-004",
        productId: "PROD-004",
        name: "Agenda Corporativa",
        price: 39.9,
        quantity: 3,
        image: "/placeholder.svg",
      },
    ],
    total: 119.7,
    createdAt: "2024-02-25T16:00:00Z",
    updatedAt: "2024-02-25T16:00:00Z",
    deliveryAddress: {
      street: "Rua Augusta",
      number: "789",
      complement: "Sala 123",
      neighborhood: "Consolação",
      city: "São Paulo",
      state: "SP",
      zipCode: "01305-000",
    },
    paymentMethod: "credit_card",
    paymentStatus: "pending",
  },
]

