import { client } from "@/lib/clientsanity"
import { groq } from "next-sanity"
import Link from "next/link"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select"

import dynamic from "next/dynamic"
const CategoryFilter = dynamic(()=> import("@/components/CategoryFilter"),{ssr:false})
export const revalidate = 10

export default async function page({ searchParams }: { searchParams: { category?: string } }) {
    //const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const selectedCategory = searchParams.category
    let query = groq`
    *[_type == "post" && chapter == 'advanced'] | order(_createdAt desc) {
    ...,
}
    `
    let params = {}
    
    if(selectedCategory){
        const categoryQuery = groq`*[_type == "category" && title == $selectedCategory]{ _id }`
        const categoryData = await client.fetch(categoryQuery, { selectedCategory })
        if (categoryData.length > 0) {
            const categoryId = categoryData[0]._id
            query = groq`
            *[_type == "post" && categories[]._ref match $categoryId]{
                title,
                slug,
                categories[]->{ _id, title }
            }`
            params = { categoryId }
        }
    }
    const post = await client.fetch(query,params)
    console.log(post)
    return (

        <div className="max-w-3xl mx-auto p-4 flex flex-col space-y-3  ">
            <div className="mt-9 mb-4">
                <p className="text-3xl  md:text-4xl font-bold  ">Advanced Topics</p>
            </div>
           
           <CategoryFilter/>

            <div className="flex flex-col mt-5 m-4" style={{ justifyItems: "start" }}>
                <ul className="">
                    {
                        post.map((post: any) => (
                            <li key={post._id} className="list-disc hover:underline text-[17px] md:text-[19px]">
                                <Link href={`/advanced/${post.slug.current}`}>
                                    {post.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}