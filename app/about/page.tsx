
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Information about me",
};

export default async function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            About Me
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <Avatar className="h-48 w-48">
            <AvatarImage src="/2.jpeg" alt={siteConfig.author} />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center break-words">
            Software Developer
          </p>
          <div className="flex items-center">
            <button   className="w-[120px] h-[40px] ml-9 p-2 rounded-sm font-semibold text-white bg-blue-700">
              <a href="/myself">Go to Profile</a></button>
          </div>
        </div>
        <p className="text-muted-foreground text-lg py-4">
        <span className="dark:text-orange-400 text-blue-700 text-lg">"This above all: to thine own self be true."  William Shakespeare</span> 
        <span>.....</span>
        In the bustling world of technology and constant innovation, 
        me stands as a testament to the balance between logic and tranquility. As a dedicated software engineer, try to intricately weaves the fabric of digital solutions, bringing ideas to life with precision and creativity. -- Bibhabendu
        </p>
      </div>
    </div>
  );
}
