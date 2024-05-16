import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 shadow-md"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={25}
        width={25}
      />

      <span className="text-base font-medium">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
