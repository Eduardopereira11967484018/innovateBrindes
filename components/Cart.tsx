"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Cart() {
  const router = useRouter()
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  // Garantir que a rota para checkout esteja correta
  const handleCheckout = () => {
    router.push("/checkout/cart")
  }

  if (state.items.length === 0) {
    return (
      <div className="flex h-[450px] flex-col items-center justify-center gap-4">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">Seu carrinho está vazio</p>
        <Button variant="secondary" asChild>
          <Link href="/">Continuar Comprando</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-[450px] flex-col gap-4">
      <ScrollArea className="flex-1 pr-4">
        <div className="flex flex-col gap-4">
          {state.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-md border bg-muted">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price)}
                </p>
                <div className="mt-auto flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm tabular-nums">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 ml-auto"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(state.total)}
          </span>
        </div>
        <Button className="w-full mt-4" onClick={handleCheckout}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}

