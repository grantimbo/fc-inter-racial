import { client } from "@/lib/sanity";
import Header from "@/src/app/components/header";
import Footer from "@/src/app/components/footer";
import ProductDetails from "@/src/app/components/product-details";
import notFound from "@/src/app/not-found";
import { siteTitle } from "@/lib/seo";
import { Metadata } from "next";
import { Product } from "@/lib/types";
import { cache } from "react";

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

  return {
    title: `${product?.name ?? "Product Not Found"} - ${siteTitle}`,
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
