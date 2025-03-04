import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon as ShoppingCartX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-4">
      <ShoppingCartX className="h-10 w-10 text-muted-foreground" />
      <h2 className="text-2xl font-bold">Checkout não encontrado</h2>
      <p className="text-muted-foreground">O checkout que você está procurando não existe.</p>
      <Button asChild>
        <Link href="/">Voltar para o início</Link>
      </Button>
    </div>
  )
}

