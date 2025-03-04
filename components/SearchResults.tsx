import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface SearchResultsProps {
  query: string
  total: number
}

export function SearchResults({ query, total }: SearchResultsProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">
          {total > 0
            ? `${total} resultado${total === 1 ? "" : "s"} para "${query}"`
            : `Nenhum resultado para "${query}"`}
        </h1>
      </div>

      {total === 0 && (
        <div className="bg-muted/50 rounded-lg p-4 text-muted-foreground">
          <p className="mb-2">Não encontramos produtos correspondentes à sua busca.</p>
          <p className="text-sm">Sugestões:</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>Verifique se há erros de digitação</li>
            <li>Use termos mais genéricos</li>
            <li>Tente buscar por categorias ou características do produto</li>
          </ul>
        </div>
      )}
    </div>
  )
}

