"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import Search from "@/app/_components/search";

interface RestaurantProps {
  userFavoritedRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoritedRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
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
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:flex-wrap lg:gap-x-5">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              userFavoritedRestaurants={userFavoritedRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
