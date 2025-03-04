"use client"

import { Mail, Package, Phone, ShoppingCart, User } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Cart } from "./Cart"
import { InstantSearch } from "./InstantSearch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()
  const { state } = useCart()
  const { user, logout } = useAuth()
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#99CC00] py-4">
      <div className="container mx-auto flex items-center gap-4 px-4">
        <Link href="/">
          <Image
            src="innovate.jpg"
            alt="Innovate Brindes"
            width={180}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        <InstantSearch />

        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white" asChild>
                  <a href="mailto:contato@innovationbrindes.com.br" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-6 w-6" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>eduardopereira.lima@yahoo.com</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white" asChild>
                  <a href="https://wa.me/5511912345678" target="_blank" rel="noopener noreferrer">
                    <Phone className="h-6 w-6" />
                    <span className="sr-only">Telefone</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>(11) 91234-5678</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white" asChild>
                  <Link href="/tracking">
                    <Package className="h-6 w-6" />
                    <span className="sr-only">Rastreamento</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rastrear Pedido</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-white text-[#99CC00] p-0 flex items-center justify-center">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Carrinho de Compras</SheetTitle>
              </SheetHeader>
              <Cart />
            </SheetContent>
          </Sheet>

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="bg-white text-[#99CC00]">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="hidden md:flex flex-col">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-white/80 hover:text-white"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="ghost" asChild className="text-white">
              <Link href="/login">
                <User className="mr-2 h-5 w-5" />
                Entrar
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

