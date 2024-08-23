import { client } from "@/lib/clientsanity"
import { groq } from "next-sanity"
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from "@/components/RichTextComponent"
import Link from "next/link"
import PostViewCount from "@/components/PostViewCount"
type Props = {
    params: {
        slug: string
    }
}

export const revalidate = 120

export async function generateStaticParams() {
    const query = groq`
    *[_type == 'post']{
        slug
    }
    `
    // const posts = await client.fetch('*[_t)
   
    const slugs: any = await client.fetch(query)
    const slugRoutes = slugs.map(({ slug }: any) => slug.current)
    return slugRoutes.map((slug: any) => ({
        slug: slug
    }))
}
async function page({ params: { slug } }: Props) {
    const query = groq`
    *[_type == 'post' && slug.current == $slug][0]{
        ...,
        author->,
        "image": author->image.asset->url
    }
    `
    
    let post;
    post = await client.fetch(query, { slug })
    

   //console.log(post);

    return (

        <article className="max-w-3xl w-[320px] md:w-[700px] mx-auto">
            <div>
            <div className='flex mb-10 mt-10 flex-col md:flex-row justify-between gap-5'>
                <div>
                    <h1 className='md:text-4xl  text-3xl font-extrabold'>
                        {post.title}
                    </h1>
                    <div className="flex mt-2 items-center space-x-4">
                    <p className=" text-[17px]">
                        {new Date(post._updatedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </p>
                    <p className = "text-[14px] ">
                        Author -  < Link href={`/author/${post.author.slug.current}`} className="hover:cursor-pointer font-bold">@{post.author.name}</Link>
                    </p>
                    </div>
                    
                    <PostViewCount post = {post}/>
                    <h1 className='text-lg  mt-4'>
                        {post.description}
                    </h1>
                </div>
            </div>
            <PortableText value={post.body} components={RichTextComponents} />
            </div>
           
        </article>


    )
}

export default page