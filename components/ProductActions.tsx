"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/services/api"

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    if (!product.price) return
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button size="lg" className="flex-1" onClick={addToCart} disabled={!product.price}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        {product.price ? "Adicionar ao Carrinho" : "Produto Indisponível"}
      </Button>
    </div>
  )
}

