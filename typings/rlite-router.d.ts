declare module "rlite-router" {
  export type RouteHandler = (url: string) => void;

  export type Route = () => any;
  export default function RLite(
    error: Route,
    routes: Record<string, Route>,
  ): RouteHandler;
}
