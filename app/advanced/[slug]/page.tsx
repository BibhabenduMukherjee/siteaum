import { RichTextComponents } from "@/components/RichTextComponent";
import { client } from "@/lib/clientsanity";
import { urlFor } from "@/lib/urlFor";
import { Link } from "lucide-react";
import { groq, PortableText } from "next-sanity";
import Image from "next/image";

type Props = {
    params: {
        slug: string
    }
}

export const revalidate = 10

export default async function page({ params: { slug } }: Props) {
    const query = groq`
    *[_type == 'post' && slug.current == $slug][0]{
        ...,
        author->,
        "image": author->image.asset->url
    }
    `
    const post = await client.fetch(query, { slug })

    return (
        <div className="flex flex-col min-h-screen pt-[20px]">
            {/* Fixed Hero Section */}
            <div className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden z-40">
                {/* Blurred background image */}
                {post.mainImage && (
                    <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover object-center blur-lg brightness-75"
                        priority
                    />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Title and meta */}
                <div className="relative z-10 flex   flex-col justify-center items-center h-full text-center px-4">
                    <div className="p-2 md:p-4 flex  flex-col items-center bg-blue-600 h-[120px] md:h-[150px] ">
                    <h1 className="text-xl   text-white md:text-5xl font-extrabold drop-shadow-md mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center mb-2 space-x-4 text-sm">
                        <span>
                            {new Date(post._createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                        <a href={`/author/${post.author.slug.current}`} className="underline">
                            @{post.author.name}
                        </a>
                    </div>
                    </div>
                    
                    
                    <p className="mt-2 max-w-xl text-base md:text-lg">
                        {post.description}
                    </p>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 md:px-0 max-w-6xl mx-auto w-full pt-10">
                <article>
                    <PortableText value={post.body} components={RichTextComponents} />
                    
                    {/* YouTube Embed if exists */}
                    {post.ytemburl && (
                        <div className="max-w-5xl mx-auto my-6">
                            <iframe
                                src={post.ytemburl}
                                title={"Embedded Content"}
                                width="100%"
                                height={500}
                                className="rounded-md border h-[300px] md:h-[460px] dark:border-gray-700"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    )}
                </article>
            </div>
        </div>
    )
}
