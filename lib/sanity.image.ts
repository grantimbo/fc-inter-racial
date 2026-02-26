import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./sanity";
import { SanityImage } from "./types";

const builder = createImageUrlBuilder(client);

/**
 * Transforms a Sanity Image reference into a URL builder.
 * @param source The image object from your Sanity query
 */
export function urlFor(source: SanityImage) {
  return builder.image(source);
}
