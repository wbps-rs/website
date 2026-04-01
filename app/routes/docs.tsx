import type { Route } from "./+types/docs";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "wbps | Docs" },
    {
      name: "description",
      content: "wbps Documentation",
    },
  ];
}

export default function Docs() {
  return (
    <main className="py-12">
      <p className="my-72 text-center text-3xl">Work In Progress!</p>
    </main>
  );
}
