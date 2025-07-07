import Link from "next/link";

export interface FooterSectionProps {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
}

export default function FooterSection(props: FooterSectionProps) {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-5">
      <section className="font-bold">{props.title}</section>

      <section>
        {props.items.map((item, index) => (
          <Link href={item.href} key={index}>
            <p>{item.title}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
