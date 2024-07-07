"use client";

import { CartContext } from "@/app/_context/cart";
import { useContext, useState } from "react";
import { Restaurant } from "@prisma/client";
import { formatCurrency } from "@/app/_helpers/price";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantHasProductsOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between gap-x-12 lg:m-auto lg:max-w-[1164px] lg:justify-normal">
        {/* PREÇO */}
        <div>
          <span className="text-xs text-muted-foreground lg:text-sm">
            Total sem entrega
          </span>
          <h3 className="font-semibold lg:text-lg">
            {formatCurrency(totalPrice)}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
            </span>
          </h3>
        </div>
        {/* BOTÃO */}
        <Button onClick={() => setIsCartOpen(true)} className="lg:w-[177px]">
          Ver Sacola
        </Button>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left lg:text-xl">Sacola</SheetTitle>
            </SheetHeader>

            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
