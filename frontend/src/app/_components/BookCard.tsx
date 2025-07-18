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
    <Link href={props.href}>
      <Card>
        <CardHeader>
          <Image
            src={props.imageUrl}
            alt={`Image of ${props.title}`}
            width={178}
            height={255}
          />
        </CardHeader>

        <CardContent>
          <h3>{props.title}</h3>
          <p>{props.author}</p>
        </CardContent>

        <CardFooter>
          <p>S/. {props.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
