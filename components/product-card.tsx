"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Product } from "@/services/api"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Eye } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ProductCardProps extends Product {
  maxDescriptionLength?: number
}

export function ProductCard({ id, title, image, description, price, maxDescriptionLength = 120 }: ProductCardProps) {
  const router = useRouter()
  const { dispatch } = useCart()

  const truncatedDescription =
    description?.length > maxDescriptionLength ? `${description.substring(0, maxDescriptionLength)}...` : description

  const handleAddToCart = useCallback(() => {
    dispatch({ type: "ADD_ITEM", payload: { id, title, price, image } })
  }, [dispatch, id, title, price, image])

  return (
    <Card className="h-[380px] flex flex-col overflow-hidden transition-transform hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 h-[3rem]">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{truncatedDescription}</p>
        <div className="mt-auto space-y-2">
          <p className="text-lg font-bold">
            {price
              ? new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(price)
              : "Preço sob consulta"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleAddToCart} className="w-full" disabled={!price}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Adicionar
            </Button>
            <Button variant="secondary" className="w-full" asChild>
              <Link href={`/products/${id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Detalhes
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

