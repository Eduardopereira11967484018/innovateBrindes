import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        <h2 className="mt-4 text-lg font-medium">Carregando pedidos...</h2>
      </div>
    </div>
  )
}

