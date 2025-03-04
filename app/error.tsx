"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-4">
      <AlertCircle className="h-10 w-10 text-destructive" />
      <h2 className="text-2xl font-bold">Algo deu errado!</h2>
      <p className="text-muted-foreground">Ocorreu um erro ao processar sua solicitação.</p>
      <Button
        onClick={() => {
          // Ensure reset is a function before calling it
          if (typeof reset === "function") {
            reset()
          } else {
            // Fallback behavior if reset is not available
            window.location.reload()
          }
        }}
      >
        Tentar novamente
      </Button>
    </div>
  )
}

