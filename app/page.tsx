import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category-list";
import PromoBanner from "./_components/promo-banner";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burguersCategory, pizzasCategory } = await fetch();

  return (
    <>
      <Header />
      <div className="px-5 pt-6 lg:px-0">
        <Search isOnTheHomePage={true} />
      </div>

      <div className="px-5 pt-6 lg:pt-10">
        <CategoryList />
      </div>

      <div className="m-auto max-w-[1204px] gap-x-5 lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:grid-rows-2 lg:pt-10">
        <div className="pl-5 pt-6  lg:pt-10">
          <Link href={`/categories/${pizzasCategory?.id}/products`}>
            <PromoBanner
              src="/promo-banner-01.png"
              alt="Até 30% de desconto em pizzas"
            />
          </Link>
        </div>

        <div className="grid- space-y-4 px-5 lg:col-span-2 lg:row-start-1 lg:m-auto lg:w-full">
          <div className="flex items-center justify-between pt-6">
            <h2 className="font-semibold lg:text-lg">Pedidos Recomendados</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="/products/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <div>
            <ProductList products={products} />
          </div>
        </div>

        <div className="pr-5 pt-6 lg:pt-10">
          <Link href={`/categories/${burguersCategory?.id}/products`}>
            <PromoBanner
              src="/promo-banner-02.png"
              alt="A partir de R$17,90 em lanches"
            />
          </Link>
        </div>
      </div>

      <div className="m-auto max-w-[1204px] space-y-4 py-6 lg:-translate-y-[68px] lg:px-5 lg:pb-10 lg:pt-10 2lg:-translate-y-[46px] xl:-translate-y-[30px]">
        <div className="flex items-center justify-between px-5 lg:px-0">
          <h2 className="font-semibold lg:text-lg">
            Restaurantes Recomendados
          </h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href={"/restaurants/recommended"}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <div className="pl-5 lg:pl-0">
          <RestaurantList />
        </div>
      </div>
    </>
  );
};

export default Home;
