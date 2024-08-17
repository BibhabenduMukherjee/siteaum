import { PostItem } from "@/components/post-item";
import { client } from "@/lib/clientsanity"

export default async function Page() {
    async function getPosts() {
        const posts = await client.fetch('*[_type == "post"]')
        return posts
    }
   // const a = await getPosts();
   // console.log(a);

    return (
        <div className="max-w-2xl text-center mx-auto p-2 mt-10">
            {
                // a.length > 0 &&
                //  <div  className="flex   flex-col space-y-2 p-2">
                //     {
                //         a.map((i: any) => (
                //             <PostItem key={i} title= {i.title} date = {i.publishedAt} slug={`topics/c/${i.slug.current}`} description={i.description}/>
                           
                //         ))

                //     }
                // </div>
            }
            coming soon.....
        </div>
    )
}