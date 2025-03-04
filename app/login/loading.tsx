import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      <h2 className="mt-4 text-lg font-medium">Carregando...</h2>
    </div>
  )
}

