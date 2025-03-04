"use client"

import Image from "next/image"
import { Package, ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import type { Product } from "@/services/api"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    if (!product.price) return
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Código: {product.id}</p>

          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-5 w-5" />
            Com embalagem especial
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Cores disponíveis:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="h-8 w-8 rounded-full border shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="mb-2 font-semibold">Descrição:</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-3xl font-bold text-primary">
              {product.price
                ? new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)
                : "Preço sob consulta"}
            </p>

            <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart} disabled={!product.price}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.price ? "Adicionar ao Carrinho" : "Produto Indisponível"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

