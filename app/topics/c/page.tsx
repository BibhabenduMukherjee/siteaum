import { PostItem } from "@/components/post-item";
import { client } from "@/lib/clientsanity"
import { flg } from "@/run";
import { groq } from "next-sanity";

export default async function Page() {
    async function getPosts() {
        const query = groq`
        *[_type == "post" && topic == "c"]
        `
        const posts = await client.fetch(query)
        return posts
    }
    let a = [];
    if(flg.NEXT_PUBLIC_PUBLISH_MODE){
        a = await getPosts();
    }
   
  //console.log(a);
    return (
        <div className="max-w-2xl  mx-auto p-2 mt-10">
            {
                a.length > 0 ?
                 <div  className="flex   flex-col space-y-2 p-2">
                    {
                        a.map((i: any) => (
                            <PostItem key={i} title= {i.title} date = {i.publishedAt} slug={`topics/c/${i.slug.current}`} description={i.description}/>
                           
                        ))

                    }
                </div> : "coming soon.."
            }
         
        </div>
    )
}