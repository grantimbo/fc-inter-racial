import { client } from "@/lib/sanity";
import Header from "@/src/app/components/header";
import Footer from "@/src/app/components/footer";
import ProductDetails from "@/src/app/components/product-details";
import notFound from "@/src/app/not-found";
import { siteTitle } from "@/lib/seo";
import { Metadata } from "next";
import { Product } from "@/lib/types";
import { cache } from "react";
import { urlFor } from "@/lib/sanity.image";

// Update the type to reflect that params is a Promise
export type ParamsType = {
  params: Promise<{
    slug: string;
  }>;
};

// 1. Wrap the fetch call in React's cache function
const getProduct = cache(async (slug: string) => {
  const product = await client.fetch<Product[]>(
    `*[_type == "product" && slug.current == $slug]`,
    { slug },
  );
  return product?.[0] || null;
});

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: `Product Not Found - ${siteTitle}` };
  }

  const { name, description, mainImage } = product;

  const ogImage = mainImage
    ? urlFor(mainImage).width(1200).height(630).fit("crop").url()
    : `/imgs/og-default.jpg`;

  return {
    title: `${name} | IRFC Shop`,
    description:
      description ||
      `Get your official ${name} from Inter Racial Football Club.`,
    openGraph: {
      title: `${name} - IRFC Official Merch`,
      description: description,
      url: `/shop/${slug}`,
      siteName: "IRFC Shop",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Buy ${name} - Inter Racial Football Club`,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return notFound();

  return (
    <>
      <Header />
      <ProductDetails product={product} />
      <Footer />
    </>
  );
}
