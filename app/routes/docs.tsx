import type { Route } from "./+types/docs";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "wbps | Docs" },
    {
      name: "description",
      content: "The wbps Documentation",
    },
  ];
}

export default function Docs() {
  return (
    <main className="flex h-[calc(100dvh-202px)] items-center justify-center md:h-[calc(100vh-158px)]">
      <p className="text-center text-3xl">Work in Progress!</p>
    </main>
  );
}
