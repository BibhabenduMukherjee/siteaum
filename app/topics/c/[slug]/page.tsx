import { client } from "@/lib/clientsanity"
import { groq } from "next-sanity"
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from "@/components/RichTextComponent"
type Props = {
    params: {
        slug: string
    }
}

export const revalidate = 240

export async function generateStaticParams() {
    const query = groq`
    *[_type == 'post' && topic == 'mern']{
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
    const post = await client.fetch(query, { slug })

    return (

        <article className="max-w-3xl w-[380px] md:w-[700px] mx-auto">
            <div className='flex mb-10 mt-10 flex-col md:flex-row justify-between gap-5'>
                <div>
                    <h1 className='text-3xl font-extrabold'>
                        {post.title}
                    </h1>
                    <p className=" text-[15px]">
                        {new Date(post._updatedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </p>
                    <h1 className='text-lg  mt-4'>
                        {post.description}
                    </h1>
                </div>
            </div>
            <PortableText value={post.body} components={RichTextComponents} />
        </article>


    )
}

export default page