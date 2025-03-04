"use client"

import Image from "next/image"
import { Package, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/services/api"

export function ProductCard(product: Product) {
  const { dispatch } = useCart()

  const addToCart = () => {
    if (!product.price) return // Don't add if price is null
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  // Format price safely
  const formattedPrice = product.price
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.price)
    : "Preço sob consulta"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="absolute left-0 top-4 bg-secondary px-4 py-1 text-xs font-bold text-white">EXCLUSIVO!</div>
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          width={400}
          height={300}
          className="h-[200px] w-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 space-y-1">
          <h3 className="font-bold">{product.title}</h3>
          <p className="text-sm text-muted-foreground">- {product.id} -</p>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-5 w-5" />
          Com embalagem especial
        </div>

        {product.colors && (
          <div className="mb-4">
            <div className="mb-2 text-sm font-medium">Cores:</div>
            <div className="flex flex-wrap gap-1">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="h-5 w-5 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="mt-2 text-lg font-bold">{formattedPrice}</p>
        </div>

        <Button onClick={addToCart} className="w-full" disabled={!product.price}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.price ? "Adicionar ao Carrinho" : "Produto Indisponível"}
        </Button>
      </CardContent>
    </Card>
  )
}

