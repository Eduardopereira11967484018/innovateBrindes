import { Suspense } from "react"
import { ProductList } from "@/components/ProductList"
import { api } from "@/services/api"
import { ProductsLoading } from "@/components/ProductsLoading"
import { SearchResults } from "@/components/SearchResults"

interface SearchPageProps {
  searchParams?: {
    q?: string
    page?: string
  }
}

export default async function Home({ searchParams }: SearchPageProps) {
  const query = searchParams?.q?.trim() || ""
  const page = Number(searchParams?.page) || 1
  const limit = 12

  // Fetch products based on search query or get all products
  const {
    data: products,
    total,
    hasMore,
  } = query ? await api.searchProducts(query, page, limit) : await api.getAllProducts(page, limit)

  return (
    <main className="container mx-auto px-4 py-8">
      {query ? (
        <SearchResults query={query} total={total} />
      ) : (
        <h1 className="text-2xl font-bold mb-6">Nossos Produtos</h1>
      )}

      <Suspense fallback={<ProductsLoading />}>
        <ProductList
          initialProducts={products}
          total={total}
          hasMore={hasMore}
          onLoadMore={async () => {
            "use server"
            const nextPage = page + 1
            const result = query
              ? await api.searchProducts(query, nextPage, limit)
              : await api.getAllProducts(nextPage, limit)
            return result.data
          }}
        />
      </Suspense>
    </main>
  )
}

