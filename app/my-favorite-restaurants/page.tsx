import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import Search from "../_components/search";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

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

      <div className="max-w-[1224px] px-5 py-6 lg:m-auto">
        <h2 className="mb-6 text-lg font-semibold lg:text-xl">
          Restaurantes Favoritos
        </h2>
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:flex-wrap lg:gap-x-5">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoritedRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3 className="font-semibold">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
