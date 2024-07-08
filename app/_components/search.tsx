"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BannerOffersImage from "../../public/banner-offers-img.png";

interface SearchProps {
  isOnTheHomePage?: boolean;
}

const Search = ({ isOnTheHomePage }: SearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <div
      className={`${isOnTheHomePage ? "overflow-y-hidden lg:flex lg:h-[500px] lg:justify-center lg:bg-primary" : "absolute left-1/2  top-6 w-[600px] -translate-x-1/2"}`}
    >
      <div
        className={`${isOnTheHomePage && "lg:flex lg:w-[1184px] lg:justify-between lg:px-5 lg:pt-[126px]"}`}
      >
        <div className={`${isOnTheHomePage && "lg:flex lg:flex-col"}`}>
          <div
            className={`${isOnTheHomePage && "hidden text-white lg:mb-8 lg:block"}`}
          >
            <h1
              className={`${isOnTheHomePage ? "text-5xl font-bold" : "hidden"}`}
            >
              Está com fome?
            </h1>
            <p className={`${isOnTheHomePage ? "mt-3 text-lg" : "hidden"}`}>
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você.
            </p>
          </div>
          <form
            className={`flex gap-2 ${isOnTheHomePage && "lg:relative"}`}
            onSubmit={handleSearchSubmit}
          >
            <Input
              placeholder="Buscar restaurantes"
              className={`border-none ${isOnTheHomePage && "lg:h-[88px] lg:p-6"}`}
              onChange={handleChange}
              value={search}
            />
            <Button
              size="icon"
              type="submit"
              className={`${isOnTheHomePage && "right-6 top-6 lg:absolute lg:bg-[#FFB100]"}`}
            >
              <SearchIcon size={20} />
            </Button>
          </form>
        </div>

        <div
          className={`${isOnTheHomePage && "relative hidden lg:block"} hidden`}
        >
          <Image
            src={BannerOffersImage}
            alt="Illustatrion"
            className="relative z-10 h-[274px] w-[274px] translate-y-[120px] object-contain brightness-150 2lg:h-[371px] 2lg:w-[371px] 2lg:translate-y-[28px]"
          />
          {/* SHADOW */}
          <div className=" absolute -left-[100px] top-14 h-[451px] w-[451px] rounded-full bg-radial-gradient " />
        </div>
      </div>
    </div>
  );
};

export default Search;
