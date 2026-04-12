import type { Route } from "./+types/dashboard";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "wpbs | Dashboard" },
    {
      name: "description",
      content: "The wpbs Dashboard",
    },
  ];
}

export default function Dashboard() {
  return (
    <main className="flex h-[calc(100dvh-202px)] items-center justify-center md:h-[calc(100vh-158px)]">
      <p className="text-center text-3xl">Work in Progress!</p>
    </main>
  );
}
