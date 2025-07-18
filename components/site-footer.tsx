import { siteConfig } from "@/config/site";
import { Mail } from "lucide-react";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a target="_blank" rel="noreferrer" href="mailto:bibhabendu@icloud.com">
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6" />
          </a>
         
         

          <a target="_blank" rel="noreferrer" href={siteConfig.links.linkedin}>
            <span className="sr-only">linkedin</span>
            <Icons.linkedIn className="h-6 w-6 " />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <a href={siteConfig.links.personalSite} target="_blank">
            --- Codeaum @2025---
          </a>
        </div>
      </div>
    </footer>
  );
}
