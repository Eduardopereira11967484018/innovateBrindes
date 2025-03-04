import { apiClient } from "@/lib/api-client"
import { API_CONFIG } from "@/lib/api-config"

export interface Product {
  id: string
  title: string
  image: string
  description: string
  price: number | null
  colors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  hasMore: boolean
}

export const api = {
  async getAllProducts(page = 1, limit = 12): Promise<PaginatedResponse<Product>> {
    try {
      const data = await apiClient.request<any[]>(`${API_CONFIG.baseUrl}/busca/busca-todos-produtos-dev`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      const products = this.transformProducts(data)
      const start = (page - 1) * limit
      const end = start + limit
      const paginatedProducts = products.slice(start, end)

      return {
        data: paginatedProducts,
        total: products.length,
        hasMore: end < products.length,
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      return { data: [], total: 0, hasMore: false }
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const data = await apiClient.request<any[]>(`${API_CONFIG.baseUrl}/busca/busca-todos-produtos-dev`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      const productData = data.find((item: any) => item.codigo_produto === id)
      if (!productData) return null

      return this.transformProduct(productData)
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error)
      return null
    }
  },

  async searchProducts(query: string, page = 1, limit = 12): Promise<PaginatedResponse<Product>> {
    if (!query.trim()) return this.getAllProducts(page, limit)

    try {
      const data = await apiClient.request<any[]>(`${API_CONFIG.baseUrl}/busca/busca-todos-produtos-dev`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      // Normalize search terms and prepare for matching
      const searchTerms = query
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 1)

      // Score-based filtering with relevance ranking
      const scoredProducts = data.map((item: any) => {
        const title = (item.nome || "").toLowerCase()
        const description = (item.descricao || "").toLowerCase()
        const code = (item.codigo_produto || "").toLowerCase()

        // Calculate match score
        let score = 0

        // Exact matches get highest score
        if (title === query.toLowerCase() || code === query.toLowerCase()) {
          score += 100
        }

        // Partial matches for instant search
        if (title.includes(query.toLowerCase())) {
          score += 50
          // Bonus for starts with
          if (title.startsWith(query.toLowerCase())) {
            score += 25
          }
        }

        if (code.includes(query.toLowerCase())) {
          score += 40
        }

        if (description.includes(query.toLowerCase())) {
          score += 20
        }

        // Title matches are more important than description matches
        searchTerms.forEach((term) => {
          // Title matches
          if (title.includes(term)) {
            score += 10
            // Bonus for word boundary matches
            if (new RegExp(`\\b${term}\\b`).test(title)) {
              score += 5
            }
          }

          // Code matches
          if (code.includes(term)) {
            score += 8
          }

          // Description matches
          if (description.includes(term)) {
            score += 3
            // Bonus for word boundary matches
            if (new RegExp(`\\b${term}\\b`).test(description)) {
              score += 2
            }
          }
        })

        return {
          item,
          score,
        }
      })

      // Filter products with a score > 0 and sort by score (highest first)
      const filteredData = scoredProducts
        .filter((product) => product.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((product) => product.item)

      const products = this.transformProducts(filteredData)
      const start = (page - 1) * limit
      const end = start + limit
      const paginatedProducts = products.slice(start, end)

      return {
        data: paginatedProducts,
        total: products.length,
        hasMore: end < products.length,
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      return { data: [], total: 0, hasMore: false }
    }
  },

  transformProducts(data: any[]): Product[] {
    if (!Array.isArray(data)) return []
    return data.map((item) => this.transformProduct(item)).filter(Boolean) as Product[]
  },

  transformProduct(item: any): Product | null {
    if (!item) return null
    return {
      id: item.codigo_produto || item.id || "",
      title: item.nome || item.title || "",
      image: item.imagem_home_store || item.image || "",
      description: item.descricao || item.description || "",
      price: item.preco_dias?.[0]?.preco || null,
      colors: Array.isArray(item.cores) ? item.cores.map((cor: any) => cor.hex).filter(Boolean) : [],
    }
  },
}

