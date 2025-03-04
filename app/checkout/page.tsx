"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useCheckout } from "@/context/checkout-context"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const router = useRouter()
  const { state: cartState } = useCart()
  const { dispatch } = useCheckout()

  useEffect(() => {
    if (cartState.items.length === 0) {
      router.push("/")
      return
    }

    dispatch({
      type: "SET_ITEMS",
      payload: {
        items: cartState.items,
        total: cartState.total,
      },
    })
  }, [cartState, dispatch, router])

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
            <p className="text-gray-600 mb-6">Revise seus itens antes de prosseguir com a compra.</p>

            <Button onClick={() => router.push("/checkout/address")} className="w-full">
              Prosseguir para Entrega
            </Button>
          </div>

          <OrderSummary items={cartState.items} total={cartState.total} />
        </div>
      </div>
    </div>
  )
}

