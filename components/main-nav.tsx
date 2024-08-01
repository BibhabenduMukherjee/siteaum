"use client";

import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">

      <Link href="/" className=" flex items-center space-x-2">

       
      </Link>
      <Link href="/" className="mr-6 flex items-center space-x-2">

        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href="/blog"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/blog" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Blog
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About
      </Link>
      <Link
        href="/c"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/c" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Disclaimer
      </Link>
    </nav>
  );
}
