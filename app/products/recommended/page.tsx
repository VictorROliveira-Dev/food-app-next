import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      // Pegando os produtos com desconto maior que 0:
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    // Incluindo a captura do restaurante dono(nome do restaurante) de cada produto:
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="mb-6 px-5">
        <h2 className="py-6 text-2xl font-semibold">Pedidos Recomendados:</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
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

export default RecommendedProductsPage;
