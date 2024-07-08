import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import Search from "@/app/_components/search";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesProps {
  params: {
    id: string;
  };
}

const Categories = async ({ params: { id } }: CategoriesProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <div className="lg:hidden">
        <Header />
      </div>

      <div className="relative hidden lg:block">
        <Header />
        <div className="px-5 pt-6 lg:px-0">
          <Search isOnTheHomePage={false} />
        </div>
      </div>

      <div className="px-5 py-6 lg:m-auto lg:max-w-[1224px]">
        <h2 className="mb-6 text-lg font-semibold lg:text-xl">
          {category.name}
        </h2>
        <div className="grid grid-cols-2 gap-6 lg:flex lg:flex-wrap lg:gap-x-5">
          {category?.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
