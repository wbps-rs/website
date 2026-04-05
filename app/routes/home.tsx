import { Book, Cpu, Server, Sparkles } from "lucide-react";
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
    { title: "wbps" },
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
            <h1 className="text-center text-4xl leading-tight font-semibold tracking-tight text-balance text-primary sm:text-5xl lg:text-left">
              wbps
            </h1>
            <p className="text-center sm:text-lg lg:text-left">
              A free and open-source WASM based plugin service for bots, webhooks, automations and
              more.
            </p>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button size="lg">Get started</Button>
              <Link
                to="/docs"
                target="_blank"
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
            <div className="absolute inset-0 transform-gpu rounded-full bg-primary/10 blur-[100px]" />
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
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Server className="size-4" />
                Deploy
              </div>
              <CardDescription>
                <ul className="list-inside list-disc space-y-1">
                  <li>Open Source under the GPLv3 license</li>
                  <li>Self hosted</li>
                  <li>As a paid service</li>
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Cpu className="size-4" />
                Configure
              </div>
              <CardDescription>
                <ul className="list-inside list-disc space-y-1">
                  <li>
                    Through a Docker compose like config (Other config structures like TOML, JSON,
                    and more will get added soon)
                  </li>
                  <li>Through a dashboard website</li>
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Sparkles className="size-4" />
                Services
              </div>
              <CardDescription>
                <ul className="list-inside list-disc space-y-1">
                  <li>Well integrated</li>
                  <li>Performant</li>
                  <li>Choose and configure the ones you want</li>
                  <li>First class support</li>
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Book className="size-4" />
                Plugins
              </div>
              <CardDescription>
                <ul className="list-inside list-disc space-y-1">
                  <li>Enable and configure the ones you need</li>
                  <li>Make them yourself with a simple and straightforward API</li>
                  <li>
                    Writable in any programming language (supported by the WASM Component Model)
                  </li>
                </ul>
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
              <Accordion defaultValue={["scale"]}>
                <AccordionItem value="scale">
                  <AccordionTrigger>What happens when a plugin is inactive?</AccordionTrigger>
                  <AccordionContent>
                    Inactive plugins can be scaled down, releasing allocated resources. The service
                    can spin the plugin back up on demand when traffic or events require it.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="wasmtime">
                  <AccordionTrigger>Why combine this with Wasmtime?</AccordionTrigger>
                  <AccordionContent>
                    Wasmtime gives each plugin a constrained runtime boundary, improving fault
                    isolation and making plugin upgrades safer without redeploying the entire
                    platform. It loads and runs plugin modules safely with strong isolation
                    guarantees.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="safety">
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
