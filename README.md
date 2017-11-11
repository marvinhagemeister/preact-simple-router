# Preact Simple Router

A simple router for [preact](https://github.com/developit/preact/) based on
[rlite](https://github.com/chrisdavies/rlite) that can load both sync and async
routes.

**Note:** Although it works I'm currently not happy with the api and will likely
change the internals quite a bit to allow easier testing. Treat this package
as alpha!

## Installation

```bash
# npm
npm install --save preact preact-simple-router

# yarn
yarn add preact preact-simple-router
```

## Usage

```jsx
import { h } from "preact";
import { Router}  from "preact-simple-router";

const routes = {
  "/": () => import("./MyHomeComponent").then(m => m.default()),
  "/about": () => import("./About").then(m => m.default()),
  // Passing :name to component
  "/blog/:name": (args) => import("./MyBlogPost").then(m => m.default(args.name)),
   // Will be automatically used as error route
  "/404": () => import("../404").then(m => m.default()),
};

export default function App() {
  return <Router
    routes={routes}
    loading={() => "Loading failed"} // if network is down, etc
    error={err => "failed " + err.message} // if an unknown error occured
  />;
}
```

Linking to other routes (the `url` must be **absolute**!):

```jsx
import { h } from "preact";
import { Link}  from "preact-simple-router";

export default function App() {
  return <div>
    <Link
      href="/blog/my-first-post"
      class="my-link"
      activeClass="my-active-link"
     >
      My First Blog Post
    </Link>
  </div>;
}
```

## License

`MIT`, see [License file](LICENSE.md).
