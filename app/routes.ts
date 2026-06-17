import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/docs", "routes/docs.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  ...prefix("blog", [index("routes/blog/home.tsx"), route(":slug", "routes/blog/$slug.tsx")]),
] satisfies RouteConfig;
