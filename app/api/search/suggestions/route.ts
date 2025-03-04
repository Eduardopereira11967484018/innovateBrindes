import { NextResponse } from "next/server"
import { api } from "@/services/api"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] })
    }

    // Get all products
    const { data: allProducts } = await api.getAllProducts(1, 100)

    // Extract unique terms from product titles and descriptions
    const terms = new Set<string>()

    allProducts.forEach((product) => {
      if (product.title) {
        // Split title into words and add words with 3+ characters
        product.title
          .toLowerCase()
          .split(/\s+/)
          .forEach((word) => {
            if (word.length >= 3 && word.includes(query.toLowerCase())) {
              terms.add(word)
            }
          })
      }
    })

    // Convert to array, sort by relevance to query, and limit to 5 suggestions
    const suggestions = Array.from(terms)
      .filter((term) => term.includes(query.toLowerCase()))
      .sort((a, b) => {
        // Exact matches first
        if (a === query.toLowerCase()) return -1
        if (b === query.toLowerCase()) return 1

        // Then starts with
        if (a.startsWith(query.toLowerCase()) && !b.startsWith(query.toLowerCase())) return -1
        if (!a.startsWith(query.toLowerCase()) && b.startsWith(query.toLowerCase())) return 1

        // Then by length (shorter first)
        return a.length - b.length
      })
      .slice(0, 5)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Error generating search suggestions:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

