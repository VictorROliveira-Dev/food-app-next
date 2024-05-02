import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image
        src="/logo.png"
        alt="Logotipo da aplicação"
        height={30}
        width={100}
      />
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
