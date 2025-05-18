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

export const revalidate = 10

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
    let a;
    let post;
    post = await client.fetch(query, { slug })


    //console.log(post);

    return (

        <article className="max-w-5xl w-[320px] md:w-[880px] mx-auto">
            <div>
                <div className='flex mb-10 mt-10 flex-col md:flex-row justify-between gap-5'>
                    <div>
                        <h1 className='md:text-4xl  text-3xl font-extrabold'>
                            {post.title}
                        </h1>

                        <div className="relative min-h-18 flex flex-col md:flex-row justify-between">
                            {/* <div className='absolute top-0 w-full h-full opacity-70 blur-sm p-10'>
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={"hello"}
                                    className='object-cover object-center mx-auto'
                                    fill
                                />
                            </div> */}


                        </div>

                        <div className="flex mt-2 items-center md:space-x-4  space-x-2 ">
                            <p className=" text-[12px] md:text-[16px]">
                                {new Date(post._createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </p>
                            <p className="text-[12px] md:text-[14px] ">
                                Author -  < Link href={`/author/${post.author.slug.current}`} className="hover:cursor-pointer font-bold">@{post.author.name}</Link>
                            </p>
                        </div>

                        {/* <PostViewCount post = {post}/> */}
                        <h1 className='text-[14px]  md:text-[18px] mt-4'>
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