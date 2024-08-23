export default async function AboutPage() {
    return (
        <div className="flex w-[325px] md:w-[800px] justify-center mx-auto  ">
            <article className="prose text-md  lg:prose-lg">
                <h1></h1>
                <p className="dark:text-white/75 text-black" style={{ textAlign: "justify" }}>
                    Welcome to my blog site, {"  "} a space dedicated to the exploration and sharing of knowledge. The content presented here is intended purely for educational and informational purposes. As a passionate learner and teacher, I aim to share insights and discoveries that can enrich the understanding of those who visit.
                </p>
                <p className="dark:text-white/75 text-black" style={{ textAlign: "justify" }}>
                    The information shared on this blog is a reflection of my personal learning journey. While I strive to present original content, there may be instances where the topics and ideas discussed coincide with those found on other platforms. Any such similarities are purely coincidental, and it is not my intention to replicate or infringe upon the intellectual property of others. If any concerns arise regarding content, please feel free to reach out, and I will address them appropriately.


                </p>

                <p className="dark:text-white/75 text-black" style={{ textAlign: "justify" }}>
                    I take great care to ensure that the information provided on this blog is accurate and respectful. I do not condone or publish content that promotes illegal activities, nor do I endorse materials that could be deemed offensive or harmful to any individual or group. In particular, I am committed to respecting all religions and belief systems, recognizing the diversity and richness they bring to our world.
                </p>

                <p className="dark:text-white/75 text-black" style={{ textAlign: "justify" }}>
                    As you explore the articles and posts shared here, I encourage you to engage with the content with an open mind and a spirit of curiosity. My hope is that the knowledge you gain from this blog contributes to your personal growth and understanding.
                </p>


                <p className="dark:text-white/75 text-black" style={{ textAlign: "justify" }}>
                    Thank you for visiting, and I wish you peace and happiness through your learning journey.

                </p>
                <p>
                    Best Regards,
                </p>
                {/* <span className = "font-semibold font-mono">Bibhabendu Mukherjee</span> */}
                <blockquote className='border-l-[#F7AB0A] text-lg border-l-4 pl-5 py-2 my-5 '>Bibhabendu Mukherjee</blockquote>
            </article>
        </div>
    )
}