import { client } from "@/lib/clientsanity";
import { groq } from "next-sanity";
import dynamic from "next/dynamic";
const BookContent = dynamic(() => import("../../../components/BookContent"), {
  ssr: false,
});

const BookInfoModal = dynamic(() => import("../../../components/BookInfoModal"), {
    ssr: false,
  });

export const revalidate = 10;

export default async function BookPage({ params }: { params: { book: string } }) {
  const query = groq`
    *[_type == "book" && slug.current == $book][0] {
      title,
      description,
      "authorName": author->name,
      chapters[] {
        title,
        content
      }
    }
  `;
  const book = await client.fetch(query, { book: params.book });

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="max-w-6xl flex-col space-y-4 mx-auto p-6">
      {/* Book Title + Info Modal */}
      <div className="flex ite  items-center gap-2">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <BookInfoModal title={book.title} authorName={book.authorName} description={book.description} />
      </div>

      {/* Book Content */}
      <BookContent chapters={book.chapters} />
    </div>
  );
}
