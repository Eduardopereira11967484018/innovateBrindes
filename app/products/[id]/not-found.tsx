import { Button } from "@/components/ui/button"
import { PackageSearch } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <PackageSearch className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-bold mb-2">Produto não encontrado</h2>
      <p className="text-muted-foreground mb-6">O produto que você está procurando não existe ou foi removido.</p>
      <Button asChild>
        <Link href="/">Voltar para produtos</Link>
      </Button>
    </div>
  )
}

