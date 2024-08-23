import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { client } from "@/lib/clientsanity"
import { urlFor } from "@/lib/urlFor"
import { Metadata } from "next"
import {  groq } from "next-sanity"
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from "@/components/RichTextComponent"
type Props = {
    params: {
        slug: string
    }
}

export const metadata: Metadata = {
    title: "About The Author",
  };
  
export const revalidate = 240 

async function page({ params: { slug } }: Props) {
    const query = groq`
    *[_type == 'author' && slug.current == $slug][0]{
        ...,
    }
    `
   const author = await client.fetch(query, { slug })
   //console.log(author)
    return (
        <div>
        <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            About {author.name}
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <Avatar className="h-48 w-48">
            <AvatarImage src={urlFor(author.image).url()} alt={"authorimage"} />
            <AvatarFallback>
                <img className=" rounded-full" src="/3.png"/>
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">
           {author.name}
          </h2>
          <p className="text-muted-foreground text-center break-words">
            Software Developer
          </p>
        </div>
        
        <PortableText value={author.bio} components={RichTextComponents} />
      </div>
    </div>
        </div>
    )
}
export default page