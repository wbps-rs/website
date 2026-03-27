import BrandIcon from "~/components/BrandIcon"
import Footer from "~/components/Footer"
import { Badge } from "~/components/ui/badge"
import { Button, buttonVariants } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Separator } from "~/components/ui/separator"
import { Cpu, Server, Sparkles, Workflow } from "lucide-react"
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
      <main className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-linear-to-br from-primary/35 via-chart-2/25 to-transparent blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-primary/8 via-transparent to-transparent" />
        </div>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="order-1 space-y-6 lg:order-0">
              <div className="flex items-center justify-between lg:block">
                <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
                  wbps: WASM based plugin service.
                </h1>
              </div>
              <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                A free and open-source WASM based plugin service for bots,
                webhooks, and automations.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg">Get started</Button>
                <Button variant="outline" size="lg">
                  Managed Hosting
                </Button>
                <Link
                  to="/"
                  target="_blank"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Discord Server
                </Link>
              </div>
            </div>

            <div className="order-0 flex items-center justify-center lg:order-1">
              <BrandIcon
                className="h-auto w-1/2 max-w-sm rounded-xl border bg-accent/10 md:w-1/3 lg:w-full"
                animate={true}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <Card className="bg-card/70 shadow-xl backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Workflow className="size-5" />
                Architecture
              </CardTitle>
              <CardDescription>
                The core orchestrates services while Wasmtime executes each
                plugin in an isolated runtime boundary.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Server className="size-4" />
                    Core
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Interact with different services and manage registered
                    plugins.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Cpu className="size-4" />
                    Wasmtime
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Loads and runs plugin modules safely with strong isolation
                    guarantees.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="size-4" />
                    Feature Plugins
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Write plugins for different services in any language in
                    independent, reusable, and community-maintained pieces.
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="mb-3 text-sm font-medium">Example plugins</p>
                <div className="flex flex-wrap gap-2">
                  {pluginExamples.map((name) => (
                    <Badge key={name} variant="outline">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <Card className="bg-card/70 shadow-xl backdrop-blur-md">
            <CardHeader>
              <CardTitle>Common Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion defaultValue={["scale"]}>
                <AccordionItem value="scale">
                  <AccordionTrigger>
                    What happens when a plugin is inactive?
                  </AccordionTrigger>
                  <AccordionContent>
                    Inactive plugins can be scaled down, releasing allocated
                    resources. The service can spin the plugin back up on demand
                    when traffic or events require it.
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
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  )
}
