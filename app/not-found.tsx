import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PackageSearch } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-4">
      <PackageSearch className="h-10 w-10 text-muted-foreground" />
      <h2 className="text-2xl font-bold">Página não encontrada</h2>
      <p className="text-muted-foreground">A página que você está procurando não existe.</p>
      <Button asChild>
        <Link href="/">Voltar para o início</Link>
      </Button>
    </div>
  )
}

