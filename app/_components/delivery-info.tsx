import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <div className="px-5">
      <Card className="mt-3 flex justify-around py-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">Entrega</span>
            <BikeIcon size={16} />
          </div>

          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-sm font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
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
            {Number(restaurant.deliveryTimeMinutes)} min
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DeliveryInfo;
