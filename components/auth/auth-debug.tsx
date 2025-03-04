"use client"

import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AuthDebug() {
  const { user, isLoading } = useAuth()
  const [showDebug, setShowDebug] = useState(false)

  if (isLoading) {
    return <div>Carregando estado de autenticação...</div>
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button variant="outline" size="sm" onClick={() => setShowDebug(!showDebug)}>
        {showDebug ? "Ocultar Debug" : "Debug Auth"}
      </Button>

      {showDebug && (
        <Card className="mt-2 w-80">
          <CardHeader>
            <CardTitle className="text-sm">Estado de Autenticação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-2">
              <div>
                <strong>Autenticado:</strong> {user ? "Sim" : "Não"}
              </div>
              {user && (
                <>
                  <div>
                    <strong>ID:</strong> {user.id}
                  </div>
                  <div>
                    <strong>Nome:</strong> {user.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                </>
              )}
              <div>
                <strong>Cookie:</strong> {document.cookie.includes("user") ? "Presente" : "Ausente"}
              </div>
              <div>
                <strong>LocalStorage:</strong> {localStorage.getItem("user") ? "Presente" : "Ausente"}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

