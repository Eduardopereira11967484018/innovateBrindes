import type React from "react"
import { CheckoutProvider } from "@/context/checkout-context"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CheckoutProvider>
      <main className="min-h-screen bg-gray-50 py-8">{children}</main>
    </CheckoutProvider>
  )
}

