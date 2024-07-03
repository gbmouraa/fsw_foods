import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";

interface ProductsListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductsListProps) => {
  return (
    <div className="flex max-w-[1204px] gap-4 overflow-x-scroll lg:justify-between lg:gap-5 lg:overflow-hidden [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
