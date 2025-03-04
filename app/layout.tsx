import type React from "react"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Header } from "@/components/Header"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Innovate Brindes",
  description: "Brindes personalizados para sua empresa",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'