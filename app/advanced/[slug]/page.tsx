import { RichTextComponents } from "@/components/RichTextComponent";
import { client } from "@/lib/clientsanity";
import { Link } from "lucide-react";
import { groq, PortableText } from "next-sanity";

type Props = {
    params: {
        slug: string
    }
}


export default async function page({ params: { slug } }: Props) {
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
     console.log(post.author.name);
     
    return (
        <div>
            
        <article className="max-w-4xl w-[320px] md:w-[760px] mx-auto">
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
                            <a href={`/author/${post.author.slug.current}`}>@{post.author.name}</a>
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

        </div>
    )

}