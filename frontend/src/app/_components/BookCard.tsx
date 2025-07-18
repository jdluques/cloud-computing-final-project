"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  price: string;
  href: Route;
  stock?: number;
}

export default function BookCard(props: BookCardProps) {
  const { addToCart } = useCart();
  const numericPrice = parseFloat(props.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: props.id,
      title: props.title,
      author: props.author,
      price: numericPrice,
      image: props.imageUrl,
      maxQuantity: props.stock || 10,
    });
  };

  return (
    <div className="group relative">
      <Link href={props.href} className="block h-115 w-60">
        <Card className="flex h-115 w-60 flex-col justify-between transition-transform group-hover:scale-105">
          <CardHeader className="flex justify-center">
            <Image
              src={props.imageUrl}
              alt={`Image of ${props.title}`}
              width={178}
              height={255}
              className="rounded object-cover"
            />
          </CardHeader>

          <CardContent className="line-clamp-3 flex flex-col gap-2">
            <p className="font-bold">{props.author}</p>
            <p className="text-wrap">{props.title}</p>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <p className="font-bold">S/. {props.price}</p>
          </CardFooter>
        </Card>
      </Link>

      <Button
        onClick={handleAddToCart}
        className="absolute right-4 bottom-4 opacity-0 transition-opacity group-hover:opacity-100"
        size="sm"
        variant="secondary"
      >
        <ShoppingCart size={16} />
      </Button>
    </div>
  );
}
