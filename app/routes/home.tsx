import BrandIcon from "~/components/BrandIcon"
import Footer from "~/components/Footer"
import { Badge } from "~/components/ui/badge"
import { Button, buttonVariants } from "~/components/ui/button"
import { Card, CardDescription, CardHeader } from "~/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Cpu, Server, Sparkles } from "lucide-react"
import type { Route } from "./+types/home"
import { Link } from "react-router"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "wbps" },
    {
      name: "description",
      content: "A free and open-source WASM based plugin service.",
    },
  ]
}

export default function Home() {
  const pluginExamples = [
    "Discord command handlers",
    "Image processing workers",
    "Cron-job scheduling",
  ]

  return (
    <>
      <main className="relative isolate min-h-screen overflow-hidden pb-12">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -top-32 -left-24 h-125 w-125 rounded-full bg-linear-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-background via-transparent to-transparent" />
        </div>

        {/* HERO SECTION */}
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-24 pb-20 md:pt-32">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="order-1 space-y-6 lg:order-0">
              <div className="flex items-center justify-between lg:block">
                <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
                  wbps
                </h1>
              </div>
              <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                A free and open-source WASM based plugin service for bots,
                webhooks, and automations.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button size="lg">Get started</Button>
                <Link
                  to="https://discord.gg/3bgCdYRupn"
                  target="_blank"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })}
                >
                  Discord Server
                </Link>
              </div>
            </div>

            <div className="relative order-0 flex items-center justify-center lg:order-1">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-[100px]" />
              <BrandIcon
                className="relative z-10 h-auto w-2/3 max-w-sm rounded-2xl shadow-md backdrop-blur-xs md:w-1/2 md:shadow-xl lg:w-full"
                animate={true}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Architecture
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              The core orchestrates services while Wasmtime executes each plugin
              in an isolated runtime boundary.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Server className="size-4" />
                  Core
                </div>
                <CardDescription>
                  Interact with different services and manage registered
                  plugins.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Cpu className="size-4" />
                  Wasmtime
                </div>
                <CardDescription>
                  Loads and runs plugin modules safely with strong isolation
                  guarantees.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="size-4" />
                  Feature Plugins
                </div>
                <CardDescription>
                  Write plugins for different services in any language in
                  independent, reusable, and community-maintained pieces.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center space-y-4">
            <p className="text-sm font-medium">Example plugins</p>
            <div className="flex flex-wrap justify-center gap-2">
              {pluginExamples.map((name) => (
                <Badge key={name} variant="outline">
                  {name}
                </Badge>
              ))}
            </div>
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
                    <AccordionTrigger>
                      What happens when a plugin is inactive?
                    </AccordionTrigger>
                    <AccordionContent>
                      Inactive plugins can be scaled down, releasing allocated
                      resources. The service can spin the plugin back up on
                      demand when traffic or events require it.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="safety">
                    <AccordionTrigger>
                      Why combine this with Wasmtime?
                    </AccordionTrigger>
                    <AccordionContent>
                      Wasmtime gives each plugin a constrained runtime boundary,
                      improving fault isolation and making plugin upgrades safer
                      without redeploying the entire platform.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  )
}
