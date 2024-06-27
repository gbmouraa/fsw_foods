import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import Search from "@/app/_components/search";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
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

  if (!restaurant) {
    return notFound();
  }
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="lg:pb-10">
      <div className="relative hidden lg:block">
        <Header />
        <div className="px-5 pt-6 lg:px-0">
          <Search isOnTheHomePage={false} />
        </div>
      </div>

      <div className="m-auto max-w-[1184px]">
        <div className="min-h-[380px] lg:flex">
          {/* TODO: Ajuatar tamanho da imagem aqui */}
          <div className="overflow-hidden lg:ml-5 lg:min-h-[380px] lg:min-w-[60%]  lg:rounded-[10px] xl:ml-0 xl:min-w-[750px]">
            <RestaurantImage
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          </div>

          <div className="lg:w-[40%]">
            <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5 lg:ml-5 lg:mt-0 lg:flex-1 lg:rounded-none lg:pl-0 lg:pr-5 lg:pt-1 xl:px-0">
              {/* TITULO */}
              <div className="flex items-center gap-[0.375rem] lg:w-full">
                <div className="relative h-8 w-8">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    sizes="100%"
                    className="rounded-full object-cover"
                  />
                </div>
                <h1 className="text-xl font-semibold 2lg:text-2xl">
                  {restaurant.name}
                </h1>
              </div>

              <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white 2lg:px-3 2lg:py-[6px]">
                <StarIcon
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="text-xs font-semibold">5.0</span>
              </div>
            </div>

            <div className="px-5 xl:pl-5 xl:pr-0">
              <DeliveryInfo restaurant={restaurant} />
            </div>

            {/* CATEGORIES */}
            <div className="mt-3 flex gap-4 overflow-x-scroll px-5 lg:flex-wrap 2lg:justify-between xl:pl-5 xl:pr-0 [&::-webkit-scrollbar]:hidden">
              {restaurant.categories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center lg:min-w-[100px] lg:py-1 xl:min-w-[116px]"
                >
                  <span className="text-xs text-muted-foreground xl:text-sm">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="hidden  px-5 pt-5 lg:block">
              <span className="mb-2 block text-2xl font-semibold">Sobre</span>
              <p className="text-[#7E8392]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                obcaecati, fugit illo facilis, officia cumque excepturi beatae,
                placeat ratione assumenda saepe eaque a atque iusto vitae
                quisquam enim officiis? Exercitationem?
              </p>
            </div>
          </div>
        </div>

        <div className="m-auto mt-6 max-w-[1182px] space-y-4 px-5  lg:mt-10 xl:px-0">
          <h2 className="font-semibold lg:text-lg">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4 px-5 xl:px-0" key={category.id}>
            {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
            <h2 className="font-semibold lg:text-lg">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </div>
  );
};

export default RestaurantPage;
