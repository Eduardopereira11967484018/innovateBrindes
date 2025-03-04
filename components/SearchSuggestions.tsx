"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchSuggestionsProps {
  query: string
  onSelect: (suggestion: string) => void
}

export function SearchSuggestions({ query, onSelect }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query || query.length < 2) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setSuggestions(data.suggestions || [])
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSuggestions()
  }, [query])

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border z-50">
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm px-3 py-2 h-auto rounded-none"
              onClick={() => onSelect(suggestion)}
            >
              <Search className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              {suggestion}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

