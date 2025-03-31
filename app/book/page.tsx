import { client } from "@/lib/clientsanity"
import { urlFor } from "@/lib/urlFor"
import { groq } from "next-sanity"
import Image from "next/image"
import Link from "next/link"
import { log } from "node:console"

export const revalidate = 10

const query = groq`*[_type == "book"] | order(_createdAt desc) {
    title,
    slug,
    description,
    bookCoverImage
}`

export default async function BooksPage() {
    const books = await client.fetch(query)
   console.log(books[0].bookCoverImage)
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book:any) => (
                    <Link key={book.slug.current} href={`/book/${book.slug.current}`}>
                        <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
                            {book.bookCoverImage && (
                                <Image
                                    src={urlFor(book.bookCoverImage).url()}
                                    alt={book.title}
                                    width={300}
                                    height={400}
                                    className="rounded-md object-cover w-full"
                                />
                            )}
                            <h2 className="text-xl font-semibold mt-4">{book.title}</h2>
                            <p className="text-gray-600 text-sm mt-1">{book.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
