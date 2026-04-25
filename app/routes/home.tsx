import { Book, Server, SquarePen, Puzzle, Webhook } from "lucide-react";
import { Link } from "react-router";

import BrandIcon from "~/components/BrandIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardDescription, CardHeader } from "~/components/ui/card";

import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "wpbs" },
    {
      name: "description",
      content: "A free and open-source WASM based plugin service.",
    },
  ];
}

export default function Home() {
  return (
    <main className="py-12">
      {/* HERO SECTION */}
      <section className="container mx-auto flex flex-col gap-8 px-6 pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="order-1 space-y-6 lg:order-0">
            <h1 className="text-primary text-center text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl lg:text-left">
              wpbs
            </h1>
            <p className="text-center sm:text-lg lg:text-left">
              A free and open-source WASM based plugin service for bots, webhooks, automations and
              more.
            </p>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button size="lg">Get started</Button>
              <Link
                to="/docs"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
              >
                <Book />
                Docs
              </Link>
            </div>
          </div>

          <div className="relative order-0 flex items-center justify-center lg:order-1">
            <div className="bg-primary/10 absolute inset-0 transform-gpu rounded-full blur-[100px]" />
            <BrandIcon
              className="relative h-auto w-2/3 max-w-sm md:w-1/2 lg:w-full"
              animate={true}
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Features</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Server className="size-4" />
                Deploy
              </div>
              <CardDescription>
                Choose the deployment model that works for you. Run it yourself (open-source under
                GPLv3), or subscribe to our managed service for convenience and peace of mind.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <SquarePen className="size-4" />
                Configure
              </div>
              <CardDescription>
                Set up your environment your way. Use a YAML (Docker Compose-like) config, or
                explore other formats such as TOML or JSON. Prefer a visual interface? Our dashboard
                has you covered.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Webhook className="size-4" />
                Services
              </div>
              <CardDescription>
                Pick and choose the services you need. Enjoy seamless integration, high performance,
                and dedicated support, all tailored to fit your workflow.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Puzzle className="size-4" />
                Plugins
              </div>
              <CardDescription>
                Extend your platform effortlessly. Enable the plugins you need, build your own with
                a simple API, and write in any language thanks to WASM support.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="mx-auto w-full max-w-3xl px-6 py-24">
        <Card>
          <CardHeader>
            Common Questions
            <CardDescription>
              <Accordion defaultValue={["polyglot"]}>
                <AccordionItem value="polyglot">
                  <AccordionTrigger>What languages can I write plugins in?</AccordionTrigger>
                  <AccordionContent>
                    Plugins can be written in any programming language that is supported by the WASM
                    Component Model. This gives you the flexibility to use your preferred language
                    while still benefiting from strong isolation and security guarantees.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </main>
  );
}
