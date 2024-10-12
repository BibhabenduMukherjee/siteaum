import { client } from "@/lib/clientsanity"
import { groq } from "next-sanity"
import Link from "next/link"

export const revalidate = 10
export default async function page (){
    const query = groq`
    *[_type == "post" && chapter == 'advanced'] | order(_createdAt desc) {
    ...,
}
    `
    const post = await client.fetch(query)
    console.log(post)
    return (
        <div className = "max-w-3xl mx-auto p-4 flex flex-col space-y-1 ">
            <div className = "mt-9 mb-4">
                <p className = "text-3xl  md:text-4xl font-bold  ">Advanced Topics</p>
            </div>
            <div className="flex flex-col m-4" style={{justifyItems : "start"}}>
                <ul className="">
                    {
                        post.map((post :any) => (
                            <li key = {post._id} className="list-disc hover:underline text-[17px] md:text-[19px]">
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