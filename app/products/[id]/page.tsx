import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import Header from "@/app/_components/header";
import Search from "@/app/_components/search";
import ProductList from "@/app/_components/product-list";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="m-auto max-w-[1204px] lg:px-5">
      <div className="relative hidden lg:block">
        <Header />
        <div className="px-5 pt-6 lg:px-0">
          <Search isOnTheHomePage={false} />
        </div>
      </div>

      <div className="lg:flex lg:pt-6">
        {/* IMAGEM */}
        <div className="lg:min-w-[60%]">
          <ProductImage product={product} />
        </div>

        {/* TITULO E PREÇO */}
        <ProductDetails product={product} complementaryProducts={juices} />
      </div>

      <div className="mt-10 hidden lg:block">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={juices} />
      </div>
    </div>
  );
};

export default ProductPage;
