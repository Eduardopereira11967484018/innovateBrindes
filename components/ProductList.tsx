"use client"

import { useEffect, useCallback, useState } from "react"
import { ProductCard } from "./product-card"
import type { Product } from "@/services/api"
import { PackageSearch, Loader2, AlertCircle } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface ProductListProps {
  initialProducts: Product[]
  searchQuery?: string
  total?: number
  hasMore?: boolean
  onLoadMore?: () => Promise<Product[]>
}

export function ProductList({ initialProducts, searchQuery, total, hasMore = false, onLoadMore }: ProductListProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  })

  const [products, setProducts] = useState<Product[]>(initialProducts || [])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reachedEnd, setReachedEnd] = useState(!hasMore)

  // Update products when initialProducts change
  useEffect(() => {
    setProducts(initialProducts || [])
    setReachedEnd(!hasMore)
  }, [initialProducts, hasMore])

  const handleLoadMore = useCallback(async () => {
    if (!onLoadMore || isLoadingMore || reachedEnd) return

    try {
      setIsLoadingMore(true)
      setError(null)
      const newProducts = await onLoadMore()

      if (newProducts && newProducts.length > 0) {
        setProducts((prev) => [...prev, ...newProducts])
      } else {
        setReachedEnd(true)
      }
    } catch (err) {
      console.error("Error loading more products:", err)
      setError("Erro ao carregar mais produtos. Tente novamente.")
    } finally {
      setIsLoadingMore(false)
    }
  }, [onLoadMore, isLoadingMore, reachedEnd])

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore && !reachedEnd) {
      handleLoadMore()
    }
  }, [inView, hasMore, isLoadingMore, reachedEnd, handleLoadMore])

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}{" "}
          <Button variant="link" className="h-auto p-0 text-destructive underline" onClick={() => handleLoadMore()}>
            Tentar novamente
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <PackageSearch className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">
          {searchQuery ? `Nenhum produto encontrado para "${searchQuery}"` : "Nenhum produto encontrado."}
        </p>
        {searchQuery && (
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/">Ver todos os produtos</Link>
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {!reachedEnd && (
        <div ref={ref} className="flex justify-center items-center py-8">
          {isLoadingMore && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Carregando mais produtos...</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}

