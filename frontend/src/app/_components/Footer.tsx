import Image from "next/image";
import Link from "next/link";
import { footerKeyFeatures } from "../_data/footerKeyFeatures";
import { footerSections } from "../_data/footerSections";
import { paymentMethods } from "../_data/paymentMethods";
import { socialMediaIcons } from "../_data/socialMediaIcons";
import FooterSection from "./FooterSection";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <main className="flex w-full flex-col">
      <header className="flex flex-row items-center justify-around bg-neutral-800 px-15 py-6 text-lg text-neutral-50">
        {footerKeyFeatures.map((keyFeature, index) => (
          <section
            key={index}
            className="flex flex-row items-center justify-center gap-5"
          >
            <keyFeature.Icon size={50} />

            <div>
              <p className="font-bold">{keyFeature.title}</p>
              <p>{keyFeature.description}</p>
            </div>
          </section>
        ))}
      </header>

      <section className="flex flex-row items-center justify-between px-15 py-10">
        <section className="flex flex-col items-center justify-between gap-10">
          <Image
            src={"/next.svg"}
            alt={"Ibero Librerías Logo"}
            width={100}
            height={100}
          />

          <div className="flex flex-col items-center justify-center gap-5">
            <p className="text-xs font-bold">VISITA NUESTRAS REDES</p>

            <div className="flex flex-row items-center justify-center gap-5">
              {socialMediaIcons.map((socialMedia, index) => (
                <Link href={socialMedia.href} key={index}>
                  <socialMedia.Icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {footerSections.map((section, index) => (
          <FooterSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}

        <NewsletterForm />
      </section>

      <footer className="flex w-full flex-row items-center justify-between border-t-2 px-15 py-3">
        <p className="text-xs font-bold">
          Ibero Librerías 2024. Todos los derechos reservados | IBERO A&G SAC.
          RUC 20295754444
        </p>

        <section className="flex flex-row items-center justify-center gap-5">
          {paymentMethods.map((paymentMethods, index) => (
            <Image
              key={index}
              src={paymentMethods.url}
              alt={paymentMethods.alt}
              width={50}
              height={20}
            />
          ))}
        </section>
      </footer>
    </main>
  );
}
