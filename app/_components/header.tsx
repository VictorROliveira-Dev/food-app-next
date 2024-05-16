import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logotipo da aplicação"
            fill
            className="object-cover"
          />
        </Link>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent hover:bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
