import { api } from "@/services/api"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import { Suspense } from "react"
import { ProductDetailSkeleton } from "@/components/product-detail-skeleton"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await api.getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail product={product} />
    </Suspense>
  )
}

