import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  title: string;
  author: string;
  imageUrl: string;
  price: string;
  href: Route;
}

export default function BookCard(props: BookCardProps) {
  return (
    <Link href={props.href} className="h-115 w-60">
      <Card className="flex h-115 w-60 flex-col justify-between">
        <CardHeader className="flex justify-center">
          <Image
            src={props.imageUrl}
            alt={`Image of ${props.title}`}
            width={178}
            height={255}
          />
        </CardHeader>

        <CardContent className="line-clamp-3 flex flex-col gap-2">
          <p className="font-bold">{props.author}</p>
          <p className="text-wrap">{props.title}</p>
        </CardContent>

        <CardFooter>
          <p className="font-bold">S/. {props.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
