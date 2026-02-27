import { client } from "@/lib/sanity";
import Header from "@/src/app/components/header";
import Footer from "@/src/app/components/footer";
import ProductDetails from "@/src/app/components/product-details";
import notFound from "@/src/app/not-found";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug },
  );

  if (!product) return notFound();

  return (
    <>
      <Header />
      <ProductDetails product={product} />
      <Footer />
    </>
  );
}
