"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2, X, ShoppingCart, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/services/api"
import Link from "next/link"

export function InstantSearch() {
  const router = useRouter()
  const { dispatch } = useCart()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Debounce search to prevent too many API calls
  const debouncedSearch = useDebouncedCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/products/instant-search?q=${encodeURIComponent(searchQuery)}`)
      if (!response.ok) {
        console.error("Erro na busca:", response.statusText)
        setResults([])
        return
      }

      const data = await response.json()
      setResults(data.products || [])
    } catch (error) {
      console.error("Erro na busca:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, 300)

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length >= 2) {
      setIsOpen(true)
      debouncedSearch(value)
    } else {
      setIsOpen(false)
      setResults([])
    }
  }

  // Handle adding product to cart
  const handleAddToCart = (product: Product) => {
    if (!product.price) return
    dispatch({ type: "ADD_ITEM", payload: product })
    // Optional: show a toast notification
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  // Clear search
  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }

      // Escape to close dropdown
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative flex-1 max-w-xl">
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Buscar produtos... (Ctrl+K)"
          className="w-full pl-10 pr-10 h-10 rounded-full bg-white/90 border-0"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        ) : query ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground p-0"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Limpar busca</span>
          </Button>
        ) : null}
      </form>

      {/* Instant search results dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border z-50 max-h-[80vh] overflow-auto search-dropdown"
        >
          <div className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                <span>Buscando produtos...</span>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="flex items-center justify-between px-2 py-1.5 text-sm text-muted-foreground border-b mb-2">
                  <span>{results.length} produto(s) encontrado(s)</span>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0"
                    onClick={() => router.push(`/?q=${encodeURIComponent(query.trim())}`)}
                  >
                    Ver todos os resultados
                  </Button>
                </div>
                <div className="space-y-2">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md transition-colors"
                    >
                      <div className="h-16 w-16 relative rounded overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                        <p className="text-sm font-bold text-primary mt-1">
                          {product.price
                            ? new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(product.price)
                            : "Preço sob consulta"}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                          <Link href={`/products/${product.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalhes</span>
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.price}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span className="sr-only">Adicionar ao carrinho</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : query.length >= 2 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum produto encontrado para "{query}"</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Tente usar termos mais genéricos ou verifique a ortografia
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

