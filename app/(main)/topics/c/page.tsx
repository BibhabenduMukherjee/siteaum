import { PostItem } from "@/components/post-item";
import { client } from "@/lib/clientsanity"
import { flg } from "@/run";
import { groq } from "next-sanity";

export default async function Page() {
    async function getPosts() {
        const query = groq`
       *[_type == "chapter" && chapterTopic == "c"] | order(_createdAt desc) {
        ...,
        topics[topicName == "c"]{
       posts[]-> {
       ...,
       author->,
      "image": author->image.asset->url
    }
  }
}   
  
        `
        const chapterwiseposts = await client.fetch(query)
        return chapterwiseposts
    }
    let a = [];
     a = await getPosts();
    
    //console.log(a);
    return (
        <div className="max-w-2xl  mx-auto p-2 mt-10">
            {
                a.length > 0 ?
                    <div className="flex   flex-col space-y-2 p-2">
                        {
                            a.map((i: any) => (
                                <PostItem key={i} title={i.chapterName} date={i._createdAt} slug={`topics/c/chapter/${i.chapterNumber}`} chapterNumber = {i.chapterNumber} description= {`Level -- ${i.level}`} />

                            ))

                        }
                    </div> : "coming soon.."
            }

        </div>
    )
}