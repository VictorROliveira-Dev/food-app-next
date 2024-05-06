"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductInfo = ({ product, complementaryProducts }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });

  return (
    <div className="py-5">
      <div className="flex items-center gap-2 px-5">
        <div className="relative h-10 w-10">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-md font-medium text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-1 mt-1 px-5 text-xl font-black">{product.name}</h1>

      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage && <DiscountBadge product={product} />}
          </div>

          {product.discountPercentage > 0 && (
            <p className="text-md flex gap-1 font-medium text-muted-foreground">
              De:
              <div className="line-through">
                {formatCurrency(Number(product.price))}
              </div>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            onClick={handleDecreaseQuantityClick}
            size="icon"
            variant="ghost"
            className="border-2 border-solid border-muted-foreground hover:bg-muted-foreground hover:text-white"
          >
            <ChevronLeftIcon />
          </Button>
          <div className="w-4 text-lg font-medium">{quantity}</div>

          <Button onClick={handleIncreaseQuantityClick} size="icon">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="px-5">
        <Card className="mt-6 flex justify-around py-5">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-sm">Entrega</span>
              <BikeIcon size={16} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-sm font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-sm font-semibold">Grátis</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-sm">Tempo</span>
              <TimerIcon size={16} />
            </div>

            <p className="text-sm font-semibold">
              {Number(product.restaurant.deliveryTimeMinutes)} min
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </div>
  );
};

export default ProductInfo;
