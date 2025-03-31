"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { advancedCategories } from "@/tooics"

const categories = ["abc"]

export default function CategoryFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedCategoryFromUrl = searchParams.get("category") || ""

    const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromUrl)

    useEffect(() => {
        setSelectedCategory(selectedCategoryFromUrl) // Sync state when URL changes
    }, [selectedCategoryFromUrl])

    const handleChange = (value: string) => {
        setSelectedCategory(value)

        // Update URL without reloading the page
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set("category", value)
        } else {
            params.delete("category")
        }
        router.push(`/advanced?${params.toString()}`, { scroll: false }) // Updates the route
    }

    return (
        <Select onValueChange={handleChange} value={selectedCategory}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                {advancedCategories.map((category:any) => (
                    <SelectItem key={category} value={category}>
                        {category}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
