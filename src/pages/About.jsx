import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import aboutHero from "../assets/images/about-hero.svg";
import Badge from "../components/ui/Badge";

const About = () => {
  const values = [
    {
      title: "Crafted for everyday use",
      text: "We design practical packaging solutions that feel polished, dependable, and ready for daily business needs.",
    },
    {
      title: "Fast delivery, reliable service",
      text: "Our team keeps your essentials moving with responsive support and dependable stock availability.",
    },
    {
      title: "Made for modern brands",
      text: "From e-commerce shipments to retail presentation, our collection supports growing businesses with style and function.",
    },
  ];

  return (
    <div className="py-8">
      <section className="rounded-[32px] bg-white p-4 my-4 sm:p-6 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <Badge text="About us" />
            <h1 className="text-4xl font-semibold text-(--color-darkgray) sm:text-5xl">
              Packaging that works as hard as your brand.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-(--color-neutrals-gray-9)">
              We believe great packaging should feel effortless, practical, and memorable. From mailing bags to premium labels, every item in our collection is chosen to support smooth shipping and strong first impressions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/collection/all-products">
                <Button variant="fill" size="medium">
                  Shop collections
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="medium">
                  Contact us
                </Button>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] bg-(--color-fawhite) p-3 shadow-sm">
            <img src={aboutHero} alt="Packaging and shipping supplies illustration" className="w-full rounded-[22px] object-cover" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-[24px] bg-white p-5 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-(--color-darkgray)">{value.title}</h3>
            <p className="text-sm leading-7 text-(--color-neutrals-gray-9)">{value.text}</p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default About;
