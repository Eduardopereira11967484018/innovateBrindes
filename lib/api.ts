import type { Product } from "./types"

const API_URL = "https://apihomolog.innovationbrindes.com.br/api/site/v2"

export async function fetchProducts(page: number, limit: number): Promise<Product[]> {
  const response = await fetch(`${API_URL}/busca/busca-todos-produtos-dev?page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

