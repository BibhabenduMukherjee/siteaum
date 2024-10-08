import { PostItem } from "@/components/post-item"
import { client } from "@/lib/clientsanity"
import { groq } from "next-sanity"

type Props = {
    params: {
        slug: string
    }
}

export const revalidate = 10;

// export async function generateStaticParams() {
//     const query = groq`
//     *[_type == 'post']{
//         slug
//     }
//     `
//     // const posts = await client.fetch('*[_t)

//     const slugs: any = await client.fetch(query)
//     const slugRoutes = slugs.map(({ slug }: any) => slug.current)
//     return slugRoutes.map((slug: any) => ({
//         slug: slug
//     }))
// }
async function page({ params: { slug } }: Props) {
    const query = groq`
    *[_type == "chapter" && chapterNumber == $slug] | order(_createdAt desc) {
    
     topics[topicName == "c"]{
    posts[]-> {
    ...,
    author->,
   "image": author->image.asset->url
 }
}
}
`

    let post;
    post = await client.fetch(query, { slug })


     console.log("posts are" , post[0]?.topics[0].posts[0].slug);


    return (
        <div>
            <div className="max-w-2xl  mx-auto p-2 mt-10">
                {
                    post && post[0]?.topics.length > 0 ?
                        <div className="flex   flex-col space-y-2 p-2">
                            {
                                post[0].topics.map((posts: any) => (

                                    <PostItem key={posts} title={posts.posts[0].title} date={posts.posts[0]._createdAt} slug={`topics/c/${posts.posts[0].slug.current}`} description={posts.posts[0].description} />

                                ))

                            }
                        </div> : <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                                <div className="mx-auto max-w-screen-sm text-center">
                                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Page not fount</p>
                                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't  find  the page  </p>
                                    <a href="/" className="inline-flex text-black  dark:text-white hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>

                                </div>
                            </div>
                        </section>
                }

            </div>
        </div>
    )
}

export default page