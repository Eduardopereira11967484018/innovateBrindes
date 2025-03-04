"use client"

import { useSearchParams } from "next/navigation"
import { useProductSearch } from "./use-products"

export function useSearch() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const page = Number(searchParams.get("page")) || 1

  const { products, total, hasMore, isLoading, isRefreshing, error, loadMore, mutate } = useProductSearch(query)

  return {
    query,
    page,
    products,
    total,
    hasMore,
    isLoading,
    isRefreshing,
    error,
    loadMore,
    mutate,
  }
}

