"use client"

import type React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { Search, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { SearchSuggestions } from "./SearchSuggestions"

export function SearchProducts() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get("q") ?? "")
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update input value when URL search param changes
  useEffect(() => {
    setValue(searchParams.get("q") ?? "")
  }, [searchParams])

  const handleSearch = useDebouncedCallback((term: string) => {
    setIsSearching(true)
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set("q", term)
    } else {
      params.delete("q")
    }

    params.set("page", "1") // Reset to first page on new search

    Promise.resolve(router.push(`${pathname}?${params.toString()}`))
      .catch((error) => {
        console.error("Navigation error:", error)
      })
      .finally(() => {
        setIsSearching(false)
        setShowSuggestions(false)
      })
  }, 300) // Reduced debounce time for faster response

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      if (newValue.length >= 2) {
        setShowSuggestions(true)
      } else {
        setShowSuggestions(false)
      }
      handleSearch(newValue)
    },
    [handleSearch],
  )

  const clearSearch = useCallback(() => {
    setValue("")
    handleSearch("")
    setShowSuggestions(false)
    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [handleSearch])

  const handleSelectSuggestion = useCallback(
    (suggestion: string) => {
      setValue(suggestion)
      handleSearch(suggestion)
      setShowSuggestions(false)
    },
    [handleSearch],
  )

  // Handle keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }

      // Close suggestions on Escape
      if (e.key === "Escape") {
        setShowSuggestions(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative flex-1 max-w-xl" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Buscar produtos... (Ctrl+K)"
          className="w-full pl-10 pr-10 h-10 rounded-full bg-white/90 border-0"
          value={value}
          onChange={onChange}
          onFocus={() => value.length >= 2 && setShowSuggestions(true)}
        />
        {isSearching ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        ) : value ? (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground p-0"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Limpar busca</span>
          </Button>
        ) : null}
      </div>

      {showSuggestions && value.length >= 2 && <SearchSuggestions query={value} onSelect={handleSelectSuggestion} />}

      {value && (
        <div className="absolute right-3 top-full mt-1 text-xs text-muted-foreground">
          <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">ESC</kbd> para cancelar
        </div>
      )}
    </div>
  )
}

