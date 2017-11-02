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
import Header from "../Header";
import Footer from "../Footer";

const routes = {
  "/": () => import("./MyHomeComponent"),
  "/about": () => import("./About"),
  "/blog/:name": () => import("./MyBlogPost"),
  "/404": () => import("../404"), // Will be automatically used as error route
};

export default function App() {
  return <Router
    routes={routes}
    loading={() => "Loading failed"} // if network is down, etc
    error={err => "failed " + err.message} // if an unknown error occured
  />;
}
```

## License

`MIT`, see [License file](LICENSE.md).
