import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image", 
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article style={{ textAlign: "left" }} className="container  text-[17px] py-6 prose dark:prose-invert max-w-5xl mx-auto">
      <p className="mb-2 text-3xl dark:text-yellow-500 font-semibold">{post.title}</p>
      <div className="flex flex-col justify-center  gap-2 mb-2">
        <div>
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
        </div>
      
        <div className=" h-7 flex items-center  p-1 ml-1">
          <div className="flex items-center  space-x-2">
          <p className="text-[10px] md:text-sm font-bold">{post.readtime} min to read</p>
          <p className="text-[10px] md:text-sm font-bold">{new Date(post.date).toLocaleDateString()}</p>
          </div>
       
        </div>
      </div>
      {post.description ? (
        <div className="flex space-x-2">
<p style={{ textAlign: "justify" }} className="text-lg mt-0 text-muted-foreground ">{post.description}</p>

        </div>
        
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body}  />
    </article>
  );
}
