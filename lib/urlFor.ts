
import imageUrlBuilder  from "@sanity/image-url";
import { client } from "./clientsanity";
const builder = imageUrlBuilder(client)
// const builderUrl =imageUrlBuilder(clientSecuriy)
export function urlFor(source : any)
{
   return builder.image(source)
}


