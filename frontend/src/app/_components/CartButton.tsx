import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <ShoppingCart />
          Carrito
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>CARRITO DE COMPRAS</SheetTitle>
          <SheetDescription>
            Aquí puedes ver los productos que has agregado a tu carrito.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
