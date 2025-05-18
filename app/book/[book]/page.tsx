import { client } from "@/lib/clientsanity";
import { ClipboardList, Clock, FileText, Search } from "lucide-react";
import { groq } from "next-sanity";
import dynamic from "next/dynamic";
const BookContent = dynamic(() => import("../../../components/BookContent"), {
  ssr: false,
});

const BookAbstract = dynamic(() => import("../../../components/BookAbstract"), {
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
    <div className="max-w-7xl flex-col space-y-4 mx-auto p-6">
      {/* Book Title + Info Modal */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{book.title}</h1>
      </div>


      <div className="bg-gray-900 text-white rounded-xl p-6 max-w-3xl mx-auto shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold">Android OS Architecture Explained</h2>

      <div className="bg-gray-800 p-4 rounded-md space-y-2">
        <div className="flex items-center gap-2 text-blue-300 font-medium">
          <Search className="w-5 h-5" />
          Research Websites
        </div>
        <ul className="list-decimal list-inside space-y-1 text-gray-200 pl-4 text-sm">
          <li>Search for an overview of Android OS, including history and key features.</li>
          <li>Explore different layers like Kernel, HAL, ART, etc.</li>
          <li>Understand app interactions with system services.</li>
          <li>Check how apps communicate with hardware (via HAL).</li>
          <li>Study relationships across architecture layers.</li>
          <li>Find diagrams or visual breakdowns of architecture.</li>
          <li>Look into real-world app examples using system layers.</li>
        </ul>
      </div>

      <div className="flex gap-4 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Analyze Results
        </div>
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4" />
          Create Report
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Ready in a few mins
        </div>
      </div>
    </div>

      <BookAbstract description={book.description} />

      {/* Book Content */}
      <BookContent chapters={book.chapters} />
    </div>
  );
}
