import useSWR from "swr"
import useSWRInfinite from "swr/infinite"
import { api } from "@/services/api"
import type { Product, PaginatedResponse } from "@/services/api"

const PRODUCTS_PER_PAGE = 12

const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 5000,
  errorRetryCount: 3,
  errorRetryInterval: 1000,
  suspense: false,
}

const getKey = (pageIndex: number, previousPageData: PaginatedResponse<Product> | null) => {
  // Reached the end
  if (previousPageData && !previousPageData.hasMore) return null

  // First page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/products?page=1&limit=${PRODUCTS_PER_PAGE}`

  // Add the cursor to the API endpoint
  return `/api/products?page=${pageIndex + 1}&limit=${PRODUCTS_PER_PAGE}`
}

export function useProducts() {
  const { data, error, size, setSize, isLoading, isValidating, mutate } = useSWRInfinite<PaginatedResponse<Product>>(
    getKey,
    async (url) => {
      try {
        const [, params] = url.split("?")
        const searchParams = new URLSearchParams(params)
        const page = Number(searchParams.get("page"))
        const limit = Number(searchParams.get("limit"))
        return await api.getAllProducts(page, limit)
      } catch (error) {
        console.error("Error fetching products:", error)
        throw error
      }
    },
    {
      ...swrConfig,
      initialSize: 1,
      persistSize: true,
      parallel: true,
      revalidateFirstPage: false,
      fallbackData: [{ data: [], total: 0, hasMore: false }],
    },
  )

  const products = data ? data.flatMap((page) => page.data) : []
  const total = data?.[0]?.total ?? 0
  const hasMore = data ? data[data.length - 1]?.hasMore : false
  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd = isEmpty || !hasMore
  const isRefreshing = isValidating && data && data.length === size

  const loadMore = async () => {
    try {
      await setSize(size + 1)
    } catch (error) {
      console.error("Error loading more products:", error)
      throw error
    }
  }

  return {
    products,
    total,
    hasMore,
    isEmpty,
    isReachingEnd,
    isLoading,
    isRefreshing,
    error,
    loadMore,
    mutate,
  }
}

export function useProduct(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Product>(`/api/products/${id}`, () => api.getProductById(id), {
    ...swrConfig,
    fallbackData: null, // Add fallback data
  })

  return {
    product: data,
    isLoading,
    error,
    mutate,
  }
}

export function useProductSearch(query: string) {
  const { data, error, size, setSize, isLoading, isValidating, mutate } = useSWRInfinite<PaginatedResponse<Product>>(
    (pageIndex) => (query ? `/api/products/search?q=${query}&page=${pageIndex + 1}&limit=${PRODUCTS_PER_PAGE}` : null),
    async (url) => {
      const [, params] = url.split("?")
      const searchParams = new URLSearchParams(params)
      const q = searchParams.get("q")
      const page = Number(searchParams.get("page"))
      const limit = Number(searchParams.get("limit"))
      return api.searchProducts(q!, page, limit)
    },
    {
      ...swrConfig,
      initialSize: 1,
      persistSize: false,
      revalidateFirstPage: false,
    },
  )

  const products = data ? data.flatMap((page) => page.data) : []
  const total = data?.[0]?.total ?? 0
  const hasMore = data ? data[data.length - 1]?.hasMore : false
  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd = isEmpty || !hasMore
  const isRefreshing = isValidating && data && data.length === size

  return {
    products,
    total,
    hasMore,
    isEmpty,
    isReachingEnd,
    isLoading,
    isRefreshing,
    loadMore: () => setSize(size + 1),
    mutate,
  }
}

